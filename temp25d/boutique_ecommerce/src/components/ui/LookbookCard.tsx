import { LookbookSlideType } from '@/types';

interface LookbookCardProps {
  slide: LookbookSlideType;
  onViewDetails: (slide: LookbookSlideType) => void;
}

export default function LookbookCard({ slide, onViewDetails }: LookbookCardProps) {
  return (
    <div className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] aspect-[2/3] snap-center relative group">
      <img
        src={slide.image}
        alt={slide.label}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-text/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
        <button
          onClick={() => onViewDetails(slide)}
          className="text-xs uppercase tracking-[0.2em] border border-bg px-6 py-2 hover:bg-bg hover:text-text transition-colors text-bg focus:outline-none"
        >
          View Details
        </button>
      </div>
      <div className="mt-4 flex justify-between items-center px-1 font-body">
        <span className="text-xs uppercase tracking-widest font-light text-bg">
          {slide.label}
        </span>
        <span className="text-xs text-primary uppercase tracking-widest">
          {slide.city}
        </span>
      </div>
    </div>
  );
}
