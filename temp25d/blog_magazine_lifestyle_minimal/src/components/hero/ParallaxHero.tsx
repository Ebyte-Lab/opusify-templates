import React, { useRef } from 'react';
import { useParallax } from '../../hooks/useParallax';

interface ParallaxHeroProps {
  imageUrl: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  onScrollCueClick?: () => void;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  imageUrl,
  categoryLabel,
  title,
  excerpt,
  onScrollCueClick,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const yOffset = useParallax(heroRef, 0.3);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[75vh] min-h-[500px] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: `translate3d(0, ${yOffset}px, 0)`,
        }}
      />

      {/* Elegant Warm Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-text/20" />

      {/* Central Floating Heading */}
      <div className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center">
        <span className="text-xs font-heading tracking-[0.3em] uppercase text-text/60 mb-4 bg-bg/70 px-4 py-1.5 backdrop-blur-sm">
          {categoryLabel}
        </span>
        <h1 className="font-heading text-5xl md:text-7xl font-light italic leading-none mb-6">
          {title}
        </h1>
        <p className="text-sm text-text/70 max-w-md tracking-wider leading-relaxed mb-8">
          {excerpt}
        </p>
        <button
          onClick={onScrollCueClick}
          className="w-10 h-10 rounded-full border border-primary/60 text-primary flex items-center justify-center animate-bounce hover:bg-primary/10 transition-colors"
          aria-label="Scroll to read essay"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </button>
      </div>
    </section>
  );
};
