import { useState, useCallback, useMemo } from 'react';
import { useToast } from '../context/ToastContext';

export const useLike = (initialCount: number, initialLiked: boolean = false) => {
  const toast = useToast();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const toggleLike = useCallback(() => {
    setLiked((prev) => {
      const nextLiked = !prev;
      setLikeCount((count) => {
        const nextCount = nextLiked ? count + 1 : count - 1;
        return nextCount;
      });
      if (nextLiked) {
        toast.push('Article engagement saved. Thank you!');
      }
      return nextLiked;
    });
  }, [toast]);

  const formattedCount = useMemo(() => {
    return likeCount.toLocaleString();
  }, [likeCount]);

  return {
    liked,
    likeCount,
    formattedCount,
    toggleLike,
  };
};
