import React from 'react';
import { useLike } from '../../hooks/useLike';

interface LikeButtonProps {
  initialCount: number;
  initialLiked?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  initialCount,
  initialLiked = false,
}) => {
  const { liked, formattedCount, toggleLike } = useLike(initialCount, initialLiked);

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-2 bg-secondary border px-3.5 py-2 rounded-xl text-xs transition-all font-semibold ${
        liked
          ? 'border-primary text-primary'
          : 'border-borderCol text-text hover:border-primary/50'
      }`}
      aria-label={`Like article, current likes ${formattedCount}`}
    >
      <span>👍</span>
      <span className="font-mono">{formattedCount}</span>
    </button>
  );
};
export default LikeButton;
