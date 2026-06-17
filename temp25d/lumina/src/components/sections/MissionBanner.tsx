import React from 'react';

export const MissionBanner: React.FC = () => {
  return (
    <section id="mission" className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative scroll-mt-24">
      <div className="bg-primary rounded-[3rem] text-bg overflow-hidden relative shadow-float">
        {/* Background Image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200')",
          }}
        />

        <div className="relative z-10 px-8 py-20 lg:py-28 max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest bg-white/20 px-4 py-2 rounded-full inline-block mb-6">
            Our Philosophy
          </span>
          <blockquote className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
            "We believe the skin is a mirror of our relationship with the earth. By honoring soil
            health and botanical purity, we return to ourselves."
          </blockquote>
          <p className="font-semibold text-sm tracking-wider uppercase">— Lumina Founding Principle</p>
        </div>
      </div>
    </section>
  );
};
