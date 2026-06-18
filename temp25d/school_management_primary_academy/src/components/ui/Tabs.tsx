import React from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex gap-2 bg-gray-50 p-1.5 rounded-full border-2 border-gray-100 self-start ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all ${
              isActive
                ? 'bg-white text-text shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-text hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
export default Tabs;
