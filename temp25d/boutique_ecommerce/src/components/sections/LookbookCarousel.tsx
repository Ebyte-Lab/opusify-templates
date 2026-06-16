import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollCarousel } from '@/hooks/useScrollCarousel';
import { lookbookSlides } from '@/data/lookbook';
import LookbookCard from '../ui/LookbookCard';

import { LookbookSlideType } from '@/types';

interface LookbookCarouselProps {
  onViewDetails: (slide: LookbookSlideType) => void;
}

export default function LookbookCarousel({ onViewDetails }: LookbookCarouselProps) {
  const { trackRef, scrollPrev, scrollNext } = useScrollCarousel();

  return (
    <section id="collections" className="w-full bg-text text-bg py-24 md:py-32 overflow-hidden">
      <div className="px-6 mb-16 flex flex-col md:flex-row justify-between items-end max-w-full">
        <div>
          <h2 className="font-heading text-3xl md:text-5xl uppercase tracking-widest mb-4">The Lookbook</h2>
          <p className="text-xs font-light tracking-[0.2em] uppercase text-bg/60">Selected visual essays</p>
        </div>
        <div className="hidden md:flex gap-4 mt-6 md:mt-0">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border border-bg/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} strokeWidth={1} />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border border-bg/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pl-6 pb-8 gap-8 w-full cursor-ew-resize"
      >
        {lookbookSlides.map((slide) => (
          <LookbookCard key={slide.id} slide={slide} onViewDetails={onViewDetails} />
        ))}
        {/* Padding element to ensure last item can center/scroll fully */}
        <div className="min-w-[20vw] h-1" />
      </div>
    </section>
  );
}
