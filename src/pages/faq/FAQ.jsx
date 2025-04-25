import React from "react";

const faqs = [
  {
    question: "What is this website about?",
    answer:
      "This website is a platform to provide information and services to our users.",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact support by emailing us at support@example.com.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer a variety of services including tutorials, resources, and community support.",
  },
  {
    question: "Is there a subscription fee?",
    answer: "No, our platform is free to use for all users.",
  },
];

const Faq = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-6 md:px-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
