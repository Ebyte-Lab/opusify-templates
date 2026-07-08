import React from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmark } from '../../hooks/useBookmark';

interface BookmarkButtonProps {
  initialBookmarked?: boolean;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  initialBookmarked = false,
}) => {
  const { bookmarked, toggleBookmark } = useBookmark(initialBookmarked);

  return (
    <button
      onClick={toggleBookmark}
      className={`p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border transition-all ${
        bookmarked
          ? 'text-primary border-primary'
          : 'border-borderCol text-text/50 hover:text-primary'
      }`}
      aria-label="Bookmark article"
    >
      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-primary' : ''}`} />
    </button>
  );
};
export default BookmarkButton;
