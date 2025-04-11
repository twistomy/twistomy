const Faq = () => {
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

  return (
    <main className="min-h-screen bg-white text-black p-5 text-center">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions below.</p>
      </section>
      <section>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Faq;
