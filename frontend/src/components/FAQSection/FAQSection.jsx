import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2>{title}</h2>
      <div className="faq-box">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 onClick={() => toggleFAQ(index)} className={openIndex === index ? 'active' : ''}>
              {faq.question}
              <span>{openIndex === index ? '-' : '+'}</span>
            </h3>
            {openIndex === index && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
