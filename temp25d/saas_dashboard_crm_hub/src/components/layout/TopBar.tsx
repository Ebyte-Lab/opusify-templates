import React from 'react';

interface TopBarProps {
  onAddDealClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onAddDealClick }) => {
  return (
    <div className="sticky top-0 bg-secondary/85 backdrop-blur-md px-6 h-20 border-b border-slate-100 flex items-center justify-between z-10">
      {/* Search Input (Desktop) */}
      <div className="relative w-64 max-w-xs hidden sm:block">
        <input
          type="text"
          placeholder="Search contacts or pipeline..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:border-primary/50 text-sm bg-slate-50 font-medium transition-all"
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all focus:outline-none">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <button
          onClick={onAddDealClick}
          className="flex items-center gap-2 bg-primary hover:bg-pink-600 text-white font-heading font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-primary/20 transition-all focus:outline-none"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Deal
        </button>
      </div>
    </div>
  );
};
