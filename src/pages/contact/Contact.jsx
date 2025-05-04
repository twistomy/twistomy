import React from "react";

const Contact = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <section className="max-w-md w-full text-center bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello,
          drop us an email and we'll get back to you as soon as possible.
        </p>
        <div className="flex items-center justify-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-base-pink"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
          <a
            href="mailto:teamtwistomy@gmail.com"
            className="text-xl font-medium text-base-pink hover:underline"
          >
            teamtwistomy@gmail.com
          </a>
        </div>
        <button
          onClick={() => window.location = 'mailto:teamtwistomy@gmail.com'}
          className="mt-4 inline-block bg-base-pink text-white py-2 px-4 rounded-lg hover:bg-base-pink-dark transition"
        >
          Send Us an Email
        </button>
      </section>
    </main>
  );
};

export default Contact;
