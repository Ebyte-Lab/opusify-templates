import React from 'react';

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const tabs = [
    { value: 'all', label: 'All Stories' },
    { value: 'greece', label: 'Aegean Sea' },
    { value: 'minimalism', label: 'Visual Theory' },
    { value: 'interiors', label: 'Architecture' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onSelectCategory(tab.value)}
            className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? 'border-primary bg-primary text-white'
                : 'border-secondary text-text/70 hover:border-primary/50'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
