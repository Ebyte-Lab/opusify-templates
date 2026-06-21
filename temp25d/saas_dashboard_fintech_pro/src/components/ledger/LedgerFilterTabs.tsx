import React from 'react';
import clsx from 'clsx';

interface LedgerFilterTabsProps {
  activeFilter: 'ALL' | 'CREDIT' | 'DEBIT';
  onChange: (filter: 'ALL' | 'CREDIT' | 'DEBIT') => void;
}

export const LedgerFilterTabs: React.FC<LedgerFilterTabsProps> = ({ 
  activeFilter, 
  onChange 
}) => {
  const tabs: { value: 'ALL' | 'CREDIT' | 'DEBIT'; label: string }[] = [
    { value: 'ALL', label: 'All' },
    { value: 'CREDIT', label: 'Credits' },
    { value: 'DEBIT', label: 'Debits' },
  ];

  return (
    <div 
      role="tablist" 
      aria-label="Filter transactions" 
      className="flex bg-gray-950/40 border border-gray-800 rounded-lg p-0.5 text-xs select-none"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={activeFilter === tab.value}
          aria-pressed={activeFilter === tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            "px-3 py-1 rounded-md transition-all",
            activeFilter === tab.value 
              ? "bg-primary text-black font-semibold" 
              : "text-text/50 hover:text-text"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
