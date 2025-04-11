const Contact = () => {
  return (
    <main className="min-h-screen bg-white text-black p-5 text-center">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600">
          We would love to hear from you! Reach out to us via email or phone.
        </p>
      </section>

      {/* Contact Boxes */}
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
    </main>
  );
};

export default Contact;
