import React, { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "How do I register my Philips product?",
    answer: "You can register your product by visiting My Philips account section and entering your product's model number and date of purchase."
  },
  {
    id: 2,
    question: "What is covered under warranty?",
    answer: "Philips warranty typically covers manufacturing defects and malfunctions. The specific coverage depends on your product category and region."
  },
  {
    id: 3,
    question: "How can I find my product's model number?",
    answer: "The model number can be found on the product packaging, user manual, or on the product itself, usually on a label or sticker."
  },
  {
    id: 4,
    question: "How do I schedule a repair?",
    answer: "To schedule a repair, please submit a support ticket through our portal. Our team will contact you within 24 hours to arrange service."
  },
  {
    id: 5,
    question: "What are the customer care contact numbers?",
    answer: "For Personal Care: 1800-102-2929, For Health Systems: 1800-419-6788, For Domestic Appliances: 1800-572-1800"
  }
];

const FAQs = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="faqs-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq) => (
          <div key={faq.id} className="faq-item">
            <button
              className={`faq-question ${activeId === faq.id ? 'active' : ''}`}
              onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
            >
              {faq.question}
              <span className="icon">{activeId === faq.id ? '−' : '+'}</span>
            </button>
            {activeId === faq.id && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs; 