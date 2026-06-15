import React from 'react';
import type { HeroSlide as HeroSlideType } from '../../types';

interface HeroSlideProps {
  slide: HeroSlideType;
  priority?: boolean;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({ slide, priority = false }) => {
  return (
    <div className="min-w-full md:min-w-[85%] h-full snap-center relative cursor-ew-resize overflow-hidden">
      <img
        src={slide.image}
        alt={slide.alt}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.01]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
        <span className="font-body text-xs tracking-widest uppercase opacity-70 mb-2 block">
          {slide.eyebrow}
        </span>
        <h2 className="font-heading text-3xl md:text-5xl italic">
          {slide.title}
        </h2>
      </div>
    </div>
  );
};
