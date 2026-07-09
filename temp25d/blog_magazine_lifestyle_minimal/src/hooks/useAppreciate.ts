import { useState } from 'react';

interface AppreciateState {
  liked: boolean;
  likeCount: number;
  toggle: () => void;
}

export function useAppreciate(
  initialCount: number,
  initialLiked: boolean = false,
  onLike?: () => void,
  onUnlike?: () => void
): AppreciateState {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  const toggle = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      if (onUnlike) onUnlike();
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      if (onLike) onLike();
    }
  };

  return { liked, likeCount, toggle };
}
