import { useState, useCallback, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

export const useAppreciate = (initialCount: number, initialLiked: boolean = false) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const { addToast } = useToast();

  useEffect(() => {
    setLiked(initialLiked);
    setLikeCount(initialCount);
  }, [initialCount, initialLiked]);

  const toggleLike = useCallback(() => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      addToast("Acknowledgment logged on the blockchain.");
    }
  }, [liked, addToast]);

  return { liked, likeCount, toggleLike };
};
