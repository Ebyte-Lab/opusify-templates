import React from 'react';
import { useAppreciate } from '../../hooks/useAppreciate';
import { useToast } from '../../context/ToastContext';

interface MainAppreciateWidgetProps {
  initialLikes: number;
}

export const MainAppreciateWidget: React.FC<MainAppreciateWidgetProps> = ({
  initialLikes,
}) => {
  const { showToast } = useToast();

  const { liked, likeCount, toggle } = useAppreciate(
    initialLikes,
    false,
    () => showToast('Visual critique marked as appreciated.'),
    () => {}
  );

  return (
    <section className="flex flex-col items-center py-6 text-center space-y-4">
      <span className="text-xs font-heading tracking-[0.2em] text-text/40 uppercase">
        Appreciate this analysis
      </span>
      <button
        onClick={toggle}
        className={`group w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 shadow-md ${
          liked
            ? 'border-primary bg-primary text-white'
            : 'border-primary/50 text-primary/80 hover:bg-primary hover:text-white'
        }`}
        aria-label={liked ? 'Unlike this analysis' : 'Like this analysis'}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className="transform group-hover:scale-110 transition-transform"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <p className="text-xs font-heading tracking-[0.1em] text-text/60">
        <span className="font-bold">{likeCount}</span> appreciative thoughts saved
      </p>
    </section>
  );
};
