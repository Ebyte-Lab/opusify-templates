import React from 'react';
import { aboutContent, contactInfo } from '../data/aboutContent';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex-grow max-w-3xl mx-auto w-full px-6 py-12 md:py-20 space-y-16">
      <header className="text-center space-y-4">
        <span className="text-xs font-heading tracking-[0.3em] uppercase text-text/40">
          THE_JOURNAL
        </span>
        <h1 className="font-heading text-4xl md:text-6xl font-light italic">
          About &amp; Mission
        </h1>
        <div className="w-16 h-[2px] bg-primary/40 mx-auto pt-2"></div>
      </header>

      {/* Mission Statement */}
      <section className="space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tight">
          {aboutContent.heading}
        </h2>
        <div className="text-text/80 text-sm md:text-base leading-[2] font-light space-y-6">
          {aboutContent.mission.map((para, index) => (
            <p key={index} className="text-justify">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Editor Bio / Masthead */}
      <section className="border-t border-secondary/40 pt-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 bg-secondary shadow-md">
          <img
            src={aboutContent.editor.avatarUrl}
            alt={aboutContent.editor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <div>
            <h3 className="font-heading text-2xl font-bold">{aboutContent.editor.name}</h3>
            <p className="text-xs uppercase tracking-widest text-primary font-bold">
              {aboutContent.editor.role}
            </p>
          </div>
          <p className="text-sm text-text/70 leading-relaxed font-light text-justify">
            Evelyn Vance is a writer and designer focusing on architectural spatial studies and Mediterranean telemetry. She has spent over a decade documenting the remote corners of Greece and designing minimal print editions.
          </p>
        </div>
      </section>

      {/* Contact & Press */}
      <section className="border-t border-secondary/40 pt-12 space-y-6">
        <h3 className="font-heading text-2xl font-medium">Contact &amp; Inquiries</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-text/50">Editorial Office</h4>
            <p className="text-text/80 font-light">{contactInfo.address}</p>
            <p className="text-text/80 font-light">{contactInfo.phone}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-text/50">Inquiries</h4>
            <p className="text-text/80 font-light">
              General:{' '}
              <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                {contactInfo.email}
              </a>
            </p>
            <p className="text-text/80 font-light">
              Press:{' '}
              <a href={`mailto:${contactInfo.pressInquiries}`} className="text-primary hover:underline">
                {contactInfo.pressInquiries}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
