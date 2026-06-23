import React from 'react';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-secondary border-b border-slate-200 z-30 w-full shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
        <span className="font-bold tracking-tight text-lg font-heading text-text">
          CRM<span className="text-primary">HUB</span>
        </span>
      </div>
      <button
        onClick={onMenuToggle}
        className="p-2 text-text hover:text-primary focus:outline-none transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </header>
  );
};
