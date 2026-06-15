import React from 'react';
import { studioInfo } from '../../data/studioInfo';

export const BookingFooter: React.FC = () => {
  return (
    <section
      id="booking"
      className="bg-primary text-bg p-8 md:p-16 lg:p-24 mt-12 flex flex-col md:flex-row justify-between items-start md:items-center"
    >
      <div className="max-w-xl mb-10 md:mb-0">
        <h2 className="font-heading text-4xl md:text-6xl italic mb-6">
          {studioInfo.ctaHeading}
        </h2>
        <p className="font-body font-light leading-relaxed opacity-80 mb-8 max-w-md">
          {studioInfo.ctaBlurb}
        </p>
        <a
          href={`mailto:${studioInfo.email}`}
          className="inline-block bg-bg text-primary px-8 py-4 font-body text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
        >
          Inquire Availability
        </a>
      </div>
      <div className="font-body font-light text-sm opacity-60 space-y-2">
        {studioInfo.addressLines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
        <p className="pt-4">{studioInfo.email}</p>
        <p>{studioInfo.phone}</p>
      </div>
    </section>
  );
};
