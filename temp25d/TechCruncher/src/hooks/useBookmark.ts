import { useState, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

export const useBookmark = (initialBookmarked: boolean = false) => {
  const toast = useToast();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const toggleBookmark = useCallback(() => {
    setBookmarked((prev) => {
      const nextBookmarked = !prev;
      if (nextBookmarked) {
        toast.push('Article bookmarked to read queue.');
      } else {
        toast.push('Bookmark removed.');
      }
      return nextBookmarked;
    });
  }, [toast]);

  return {
    bookmarked,
    toggleBookmark,
  };
};
