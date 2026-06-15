import React from 'react';
import { studioManifesto, studioStats } from '../../data/caseStudies';

const StudioSection = () => {
  return (
    <section id="studio" className="relative bg-text text-bg py-24 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-6 block font-body">
          The Studio
        </span>

        {/* Large Manifesto Quote */}
        <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none uppercase mb-16 max-w-5xl select-none text-primary hover:text-bg transition-colors duration-500">
          {studioManifesto.quote}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-bg/10 pt-16">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 font-body text-bg/80 text-lg md:text-xl leading-relaxed">
            <p>{studioManifesto.paragraph1}</p>
            <p>{studioManifesto.paragraph2}</p>
          </div>

          {/* Right Statistics Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 md:gap-12 font-heading">
            {studioStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <span className="text-5xl md:text-7xl font-extrabold text-primary block">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm font-bold tracking-widest text-bg/40 uppercase block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
