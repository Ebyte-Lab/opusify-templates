import React from 'react';
import type { Review } from '../../types/product';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  return (
    <div className="min-w-[300px] w-[350px] neon-border bg-secondary/10 p-6 snap-start flex flex-col justify-between hover:border-primary/50 transition-colors duration-300">
      <div>
        <div
          className="flex text-primary mb-4 text-sm tracking-widest font-mono select-none"
          aria-label={`Rating: ${review.rating} stars`}
        >
          {stars}
        </div>
        <h4 className="font-heading text-white mb-2 tracking-wide">{review.title}</h4>
        <p className="font-mono text-xs text-text/70 leading-relaxed mb-6">{review.quote}</p>
      </div>
      <div className="border-t border-secondary pt-4 font-mono text-[10px] text-text/50 flex justify-between select-none">
        <span>{review.userTag}</span>
        <span>{review.verifiedTag}</span>
      </div>
    </div>
  );
};
