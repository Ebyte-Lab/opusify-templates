import React from 'react';
import { aboutData } from '../../data/aboutData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="p-4 md:p-8 lg:p-12 border-b border-secondary">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left column: Text details */}
        <div className="lg:col-span-7 space-y-12">
          <div>
            <span className="font-body text-xs tracking-widest uppercase text-text/40 block mb-2">
              Biography
            </span>
            <h2 className="font-heading text-4xl md:text-5xl italic text-primary leading-tight">
              Capturing the raw narrative <br /> of landscapes and people.
            </h2>
            <p className="font-body font-light text-text/80 text-base md:text-lg leading-relaxed mt-6 max-w-xl">
              {aboutData.bio}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-secondary pt-8">
            {/* Selected Clients */}
            <div>
              <h4 className="font-heading text-lg italic text-primary mb-4 font-semibold">
                Selected Clients
              </h4>
              <ul className="space-y-2 font-body text-sm text-text/70">
                {aboutData.clients.map((client, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary/40 mr-2.5 rounded-full"></span>
                    {client}
                  </li>
                ))}
              </ul>
            </div>

            {/* Awards & Press */}
            <div>
              <h4 className="font-heading text-lg italic text-primary mb-4 font-semibold">
                Awards & Press
              </h4>
              <ul className="space-y-3 font-body text-xs text-text/70">
                {aboutData.awards.map((award, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Publications */}
          <div className="border-t border-secondary pt-8">
            <h4 className="font-heading text-lg italic text-primary mb-4 font-semibold">
              Selected Publications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-body text-xs text-text/60 italic">
              {aboutData.publications.map((pub, idx) => (
                <div key={idx} className="border border-secondary p-4 bg-secondary/10">
                  {pub}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Artist Portrait */}
        <div className="lg:col-span-5 relative group overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <img
            src={aboutData.portraitSrc}
            alt={aboutData.portraitAlt}
            className="w-full h-auto object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 z-20 text-[10px] text-white/50 tracking-widest uppercase bg-black/40 px-2 py-1 backdrop-blur-sm">
            Self Portrait — 2026
          </div>
        </div>
      </div>
    </section>
  );
};
