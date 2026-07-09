import React from 'react';
import { useAppreciate } from '../../hooks/useAppreciate';

interface AppreciateWidgetProps {
  initialCount: number;
  initialSupported?: boolean;
}

export const AppreciateWidget: React.FC<AppreciateWidgetProps> = ({
  initialCount,
  initialSupported = false,
}) => {
  const { liked, likeCount, toggleLike } = useAppreciate(initialCount, initialSupported);

  return (
    <section className="border-t border-b border-secondary/40 py-8 flex flex-col items-center text-center space-y-4">
      <span className="text-xs font-heading tracking-widest text-text/40 uppercase select-none">
        Appreciate the build
      </span>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLike} 
          className={`w-14 h-14 border rounded-lg flex items-center justify-center transition-all group active:scale-95 shadow-md ${
            liked 
              ? 'bg-primary/20 text-primary border-primary/50' 
              : 'bg-secondary/30 text-primary border-secondary hover:bg-primary/10'
          }`}
          aria-label={liked ? "Remove appreciation support" : "Support this build"}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill={liked ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="transform group-hover:scale-110 transition-transform"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <div className="text-left font-heading">
          <span id="appreciation-counter" className="font-bold text-lg text-white block">
            {likeCount}
          </span>
          <span className="text-[10px] text-text/40 uppercase font-bold tracking-wider">
            Supporters Synced
          </span>
        </div>
      </div>
    </section>
  );
};
