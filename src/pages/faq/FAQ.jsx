const faqs = [
  {
    question: "How do you know the device prevents leakage and odor?",
    answer:
      "We’ve conducted extensive benchtop testing using simulated waste, artificial bowels, and a high-fidelity stoma mannequin to ensure TwistomyTM is both air- and effluent-tight. Preliminary verification testing was performed using well-defined protocols focused on effluent- airtightness—no leakage was observed over 12 hours after equilibration and no air leakage was detected over a four-hour test period, confirming the effluent- and airtight integrity of the device.",
  },
  {
    question: "What wafer is TwistomyTM currently compatible with?",
    answer:
      "Twistomy™ is currently compatible with the Coloplast SenSura® Mio Convex Wafer, a widely used and trusted option among ostomates. Future versions may support additional wafer systems as we continue development and testing.",
  },
  {
    question: "How often do I need to empty the device?",
    answer:
      "We recommend emptying the device every 2 to 6 hours, depending on your individual output levels. Frequency may vary based on diet, health, and daily activity. Twistomy™ is designed for daytime use and easy to empty, helping you maintain comfort and confidence throughout the day.",
  },
];

const Faq = () => {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <section className="py-12 px-6 md:px-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 w-full transition-colors duration-300"
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
      </section>
    </main>
  );
};

export default Faq;
