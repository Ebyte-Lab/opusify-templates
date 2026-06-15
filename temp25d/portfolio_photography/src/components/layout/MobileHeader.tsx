import React from 'react';

interface MobileHeaderProps {
  isOpen: boolean;
  onMenuToggle: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ isOpen, onMenuToggle }) => {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-secondary px-6 py-4 flex justify-between items-center">
      <a href="#" className="font-heading italic font-semibold text-xl tracking-wider text-primary select-none">
        Opusify
      </a>
      <button
        onClick={onMenuToggle}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="text-primary focus:outline-none p-1 cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </header>
  );
};
