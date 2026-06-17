import React from 'react';
import { MARQUEE_TEXTS } from '../../data/products';

export const MarqueeBar: React.FC = () => {
  return (
    <div className="w-full bg-primary text-bg overflow-hidden heavy-border-b py-3 flex relative whitespace-nowrap select-none">
      <div className="animate-marquee font-heading text-2xl md:text-4xl inline-flex tracking-wider">
        {/* Original Content */}
        {MARQUEE_TEXTS.map((text, index) => (
          <React.Fragment key={`orig-${index}`}>
            <span className="mx-4">{text}</span>
            <span className="mx-4">///</span>
          </React.Fragment>
        ))}
        {/* Duplicated Content for Seamless Loop */}
        {MARQUEE_TEXTS.map((text, index) => (
          <React.Fragment key={`dup-${index}`}>
            <span className="mx-4">{text}</span>
            <span className="mx-4">///</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBar;
