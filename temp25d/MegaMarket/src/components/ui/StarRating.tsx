import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number; // size in pixels or class e.g. 16 for 16px
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-orange-400 text-orange-400 flex-shrink-0"
        />
      ))}
      {hasHalfStar && (
        <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
          <Star
            size={size}
            className="text-gray-300 absolute top-0 left-0"
          />
          <StarHalf
            size={size}
            className="fill-orange-400 text-orange-400 absolute top-0 left-0"
          />
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-gray-300 flex-shrink-0"
        />
      ))}
    </div>
  );
};
export default StarRating;
