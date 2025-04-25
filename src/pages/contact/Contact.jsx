import { useState } from "react";
import { supabase } from "../../../supabaseClient";
// import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    heard_about: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("contact_messages")
      .insert([formData]);

    if (error) {
      console.error("Supabase error:", error);
      return;
    }

    try {
      // await axios.post("/api/send-email", formData);
    } catch (err) {
      console.error("Resend error:", err);
    }

    setSubmitted(true);
  };

  if (submitted)
    return <p className="text-green-500">Message sent. Thank you!</p>;

  return (
    <main className="min-h-screen content-center bg-white text-black p-5 text-center">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-6xl md:text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600 text-3xl md:text-xl mt-4">
          We would love to hear from you!
        </p>
      </section>

      <section className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              onChange={handleChange}
              placeholder="Name (required)"
              required
              className="bg-white text-black border p-4 md:p-2 text-xl md:text-base rounded w-full"
            />
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email (required)"
              type="email"
              required
              className="bg-white text-black border p-4 md:p-2 text-xl md:text-base rounded w-full"
            />
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
              className="bg-white text-black border p-4 md:p-2 text-xl md:text-base rounded w-full"
            />
            <select
              name="heard_about"
              onChange={handleChange}
              required
              className="bg-white text-black border p-4 md:p-2 text-xl md:text-base rounded w-full"
            >
              <option value="">--How did you hear about us?--</option>
              <option value="Google">Google</option>
              <option value="Friend">Friend</option>
              <option value="Ad">Ad</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input
            name="subject"
            onChange={handleChange}
            placeholder="Subject (required)"
            required
            className="bg-white text-black border p-4 md:p-2 text-xl md:text-base rounded w-full"
          />
          <textarea
            name="message"
            onChange={handleChange}
            placeholder="Your message (required)"
            required
            rows={5}
            className="bg-white text-black border p-4 md:p-2 text-xl md:text-base rounded w-full"
          />
          <button
            type="submit"
            className="bg-base-pink text-white py-2 px-4 rounded hover:bg-white border hover:border-base-pink hover:text-base-pink transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Boxes */}
      {/* <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-600 mb-4">
          For any inquiries, please reach out to us at:
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg w-full max-w-sm">
            <span className="text-xl">📧</span>
            <span className="text-gray-800">support@company.com</span>
          </div>
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg w-full max-w-sm">
            <span className="text-xl">📞</span>
            <span className="text-gray-800">+1-234-567-890</span>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default Contact;
