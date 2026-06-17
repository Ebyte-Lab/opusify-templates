import { useState } from 'react';
import type { FC } from 'react';
import type { FAQItemData } from '../../data/products';

interface FAQItemProps {
  faq: FAQItemData;
}

export const FAQItem: FC<FAQItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="heavy-border mb-4 bg-secondary/30 transition-all duration-200">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className={`w-full text-left p-6 font-bold uppercase flex justify-between items-center focus:outline-none hover:bg-text hover:text-bg transition-colors ${
          isOpen ? 'bg-text text-bg' : 'text-text'
        }`}
      >
        <span>{faq.question}</span>
        <span className="font-heading text-2xl" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        id={`faq-answer-${faq.id}`}
        className={`${
          isOpen ? 'block' : 'hidden'
        } p-6 pt-0 text-sm border-t-2 border-bg leading-relaxed`}
      >
        <div className="pt-6">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
