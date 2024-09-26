import React from 'react';
import FAQSection from '../../components/FAQSection/FAQSection';
import { guestFaqs, generalFaqs, hostFaqs, troubleshootingFaqs, cancellationFaqs } from '../../data/faqData';
import './FAQsPage.css';

const FAQsPage = () => {
  return (
    <div className="faq-container">
      <h1>Welcome to Save the Date</h1>
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <FAQSection title="Guests FAQs" faqs={guestFaqs} />
      <FAQSection title="Host FAQs" faqs={hostFaqs} />
      <FAQSection title="Cancellation FAQs" faqs={cancellationFaqs} />
      <FAQSection title="TroubleShooting Questions" faqs={troubleshootingFaqs} />
      <FAQSection title="General FAQs" faqs={generalFaqs} />
    </div>
  );
};

export default FAQsPage;
