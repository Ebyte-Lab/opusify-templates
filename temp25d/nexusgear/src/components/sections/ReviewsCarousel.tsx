import React from 'react';
import { ReviewCard } from './ReviewCard';
import { reviewsData } from '../../data/reviews';

export const ReviewsCarousel: React.FC = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-6 py-20 overflow-hidden">
      <h2 className="font-heading text-2xl text-white mb-8 border-b border-secondary pb-4 select-none">
        USER_TELEMETRY (REVIEWS)
      </h2>
      <div className="flex space-x-6 overflow-x-auto pb-8 no-scrollbar snap-x">
        {reviewsData.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};
