import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  const { name, email, phone, heard_about, subject, message } =
    await req.json();

  // 1. Store in Supabase
  const { error: dbError } = await supabase.from("contact_messages").insert([
    {
      name,
      email,
      phone,
      heard_about,
      subject,
      message,
    },
  ]);

  if (dbError) {
    console.error("Supabase DB error:", dbError);
    return new Response("Failed to store message", { status: 500 });
  }

  // 2. Format the email
  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p><strong>Heard About Us:</strong> ${heard_about}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  // 3. Send via Resend
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "Contact Form <noreply@twistomy.com>",
      to: ["info@twistomy.com"],
      subject: `Contact Form: ${subject}`,
      html,
    }),
  });

  const result = await response.json();
  console.log("Resend response:", result);

  if (!response.ok) {
    return new Response("Email failed", { status: 500 });
  }

  return new Response("Message stored and email sent", { status: 200 });
});
