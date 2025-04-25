import React from "react";

const Contact = () => {
  return (
    <section className="py-12 px-6 md:px-16 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Contact Us
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
        We would love to hear from you! Reach out to us via email or phone.
      </p>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-sm transition-colors duration-300">
          <span className="text-2xl">📧</span>
          <span className="text-gray-800 dark:text-gray-200 text-base md:text-lg">
            support@company.com
          </span>
        </div>

        <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-sm transition-colors duration-300">
          <span className="text-2xl">📞</span>
          <span className="text-gray-800 dark:text-gray-200 text-base md:text-lg">
            +1-234-567-890
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
