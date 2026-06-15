import React from 'react';
import { HeroSlide } from '../ui/HeroSlide';
import { heroSlides } from '../../data/heroSlides';

export const HeroGallery: React.FC = () => {
  return (
    <section className="w-full h-[60vh] md:h-[80vh] flex overflow-x-auto snap-x snap-mandatory no-scrollbar bg-secondary relative group select-none">
      {/* Left Edge Overlay */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
      
      {/* Slides mapping */}
      {heroSlides.map((slide, index) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          priority={index === 0}
        />
      ))}

      {/* Right Edge Overlay */}
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
      
      {/* Scroll indicator hint */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center space-x-2 text-white/70 animate-pulse bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs tracking-widest uppercase pointer-events-none">
        <span>Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </section>
  );
};
