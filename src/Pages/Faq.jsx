import React from 'react';

const faqs = [
  {
    question: "What is Hanger?",
    answer: "Hanger is your go-to destination for affordable, trendy fashion products delivered right to your doorstep."
  },
  {
    question: "How can I place an order?",
    answer: "You can browse products, add them to your cart, and checkout securely through our website."
  },
  {
    question: "What are the available payment methods?",
    answer: "We accept UPI, Net Banking, Credit/Debit Cards, and Cash on Delivery (COD) with a small advance."
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 3-7 business days depending on your location."
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes, we offer easy returns and exchanges within 7 days of delivery. Terms apply."
  }
];

function Faq() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border rounded-lg shadow-sm p-5">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faq;
