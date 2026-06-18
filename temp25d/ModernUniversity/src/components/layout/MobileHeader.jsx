import React from 'react';
import { useUI } from '../../context/UIContext';
import { Menu } from 'lucide-react';

export const MobileHeader = () => {
  const { toggleSidebar } = useUI();

  return (
    <header className="md:hidden bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-md">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white text-primary rounded flex items-center justify-center font-heading font-bold text-xl">
          U
        </div>
        <span className="font-heading text-xl font-semibold tracking-wide">University Portal</span>
      </div>
      <button
        onClick={toggleSidebar}
        className="text-white hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 p-1 rounded"
        aria-label="Toggle navigation menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};
