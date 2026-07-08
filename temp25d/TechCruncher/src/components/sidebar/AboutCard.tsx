import React from 'react';

export const AboutCard: React.FC = () => {
  return (
    <div className="bg-secondary/40 border border-borderCol rounded-2xl p-6">
      <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-3">
        About Tech Cruncher
      </h3>
      <p className="text-xs text-text/70 leading-loose">
        We deliver unfiltered systems updates, hardware diagnostics, and deep AI architecture analyses mapped to modern developmental stacks. Built by engineers, for engineers.
      </p>
    </div>
  );
};
export default AboutCard;
