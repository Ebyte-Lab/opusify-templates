import React from 'react';
import PropTypes from 'prop-types';

export const SectionHeader = ({ title, subtitle = '', action = null }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
      <div>
        <h2 className="font-heading text-2xl font-bold text-text">{title}</h2>
        {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-text hover:bg-gray-50 active:bg-gray-100 transition-colors px-4 py-2 rounded-md text-sm font-medium shadow-sm w-full sm:w-auto"
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node
  })
};
