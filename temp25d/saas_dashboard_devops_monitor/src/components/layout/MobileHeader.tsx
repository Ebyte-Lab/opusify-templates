import React from 'react';

interface MobileHeaderProps {
  onToggle: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onToggle }) => {
  return (
    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-secondary border-b border-zinc-800 z-30 w-full select-none">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]"></span>
        <span className="font-bold tracking-tight text-sm font-heading uppercase text-white">
          OPUS<span className="text-primary">/DEV_OPS</span>
        </span>
      </div>
      <button 
        onClick={onToggle} 
        className="p-2 text-white hover:text-primary transition-colors focus:outline-none"
        aria-label="Toggle mobile menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </header>
  );
};
