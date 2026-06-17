import React from 'react';
import { FAQS } from '../../data/products';
import FAQItem from '../ui/FAQItem';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="w-full md:w-3/4 lg:w-1/2 mx-auto my-24 px-6">
      <h2 className="font-heading text-5xl mb-10 text-primary">WTF (FAQ)</h2>
      <div>
        {FAQS.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
