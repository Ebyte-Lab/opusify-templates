import React from 'react';
import { Menu } from 'lucide-react';
import { useStore } from '../../hooks/useStore';

export const MobileHeader: React.FC = () => {
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  return (
    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-secondary border-b border-gray-700/50 z-30 w-full">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
        <span className="font-bold tracking-tight text-lg font-mono text-white">
          FINTECH<span className="text-primary">PRO</span>
        </span>
      </div>
      <button 
        onClick={() => setSidebarOpen(true)}
        className="p-2 text-text hover:text-primary focus:outline-none"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};
