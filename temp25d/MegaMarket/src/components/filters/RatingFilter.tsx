import React from 'react';
import { StarRating } from '../ui/StarRating';

interface RatingFilterProps {
  minRating: number;
  onRatingSelect: (rating: number) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({
  minRating,
  onRatingSelect,
}) => {
  const ratingSteps = [4, 3, 2];

  return (
    <div className="border-t border-gray-200 pt-4">
      <h4 className="font-bold text-sm mb-2 text-text">Avg. Customer Review</h4>
      <ul className="space-y-2">
        {ratingSteps.map((rating) => {
          const isActive = minRating === rating;
          return (
            <li key={rating}>
              <button
                type="button"
                onClick={() => onRatingSelect(isActive ? 0 : rating)}
                className={`flex items-center gap-2 text-sm transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1 py-0.5 w-full ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-gray-700 hover:text-primary'
                }`}
                aria-label={`Filter by ${rating} stars and up`}
              >
                <StarRating rating={rating} size={16} />
                <span>& Up</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default RatingFilter;
