import React from 'react';

interface PullQuoteProps {
  text: string;
  citation: string;
}

export const PullQuote: React.FC<PullQuoteProps> = ({ text, citation }) => {
  return (
    <blockquote className="my-12 py-6 px-8 border-l-4 border-primary bg-secondary/20 relative rounded-r-xl select-none">
      <span className="absolute top-2 left-4 text-7xl font-heading text-primary/10 select-none pointer-events-none">
        “
      </span>
      <p className="font-heading text-2xl italic tracking-wide text-text/90 leading-relaxed pl-4">
        {text}
      </p>
      <cite className="block text-xs font-bold uppercase tracking-[0.2em] text-primary mt-4 pl-4">
        — {citation}
      </cite>
    </blockquote>
  );
};
