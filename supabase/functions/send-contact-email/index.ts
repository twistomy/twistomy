import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Setup Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Replace with your domain if needed
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Ensure content type is JSON
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response("Invalid content type", {
      status: 400,
      headers: corsHeaders,
    });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("Invalid JSON:", err);
    return new Response("Invalid JSON", {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { name, email, phone, heard_about, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return new Response("Missing required fields", {
      status: 400,
      headers: corsHeaders,
    });
  }

  // Store in Supabase
  const { error: dbError } = await supabase
    .from("contact_messages")
    .insert([{ name, email, phone, heard_about, subject, message }]);

  if (dbError) {
    console.error("Supabase DB error:", dbError);
    return new Response("Failed to store message", {
      status: 500,
      headers: corsHeaders,
    });
  }

  // Send via Resend
  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "Contact Form <noreply@yourdomain.com>",
      to: ["youremail@example.com"],
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Heard About:</b> ${heard_about}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    }),
  });

  if (!resendRes.ok) {
    const error = await resendRes.text();
    console.error("Resend error:", error);
    return new Response("Email send failed", {
      status: 500,
      headers: corsHeaders,
    });
  }

  return new Response("Message stored and email sent", {
    status: 200,
    headers: corsHeaders,
  });
});
