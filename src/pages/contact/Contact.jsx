import { useState } from "react";
import { supabase } from "../../../supabaseClient";

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
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([formData]);

      if (error) throw error;

      setShowPopup(true); // ✅ show the popup
      setFormData({
        name: "",
        email: "",
        phone: "",
        heard_about: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setShowPopup(false), 3000); // auto-close in 3 sec
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen content-center bg-white dark:bg-gray-900 text-black p-5 text-center">
      {showPopup && (
        <div className="fixed top-5 right-5 z-50 bg-base-pink text-white px-4 py-2 rounded shadow-lg transition-all">
          Message sent. Thank you for reaching out!
        </div>
      )}

      <section className="text-center mb-8">
        <h1 className="text-6xl md:text-3xl font-bold dark:text-white">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-base-pink-dark text-3xl md:text-xl mt-4">
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
    </main>
  );
};

export default Contact;
