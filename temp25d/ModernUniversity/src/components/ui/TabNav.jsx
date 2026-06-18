import React from 'react';
import PropTypes from 'prop-types';

export const TabNav = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              isActive
                ? 'bg-primary text-white rounded-md shadow-sm'
                : 'text-muted hover:bg-gray-100 hover:text-text rounded-md'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

TabNav.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};
