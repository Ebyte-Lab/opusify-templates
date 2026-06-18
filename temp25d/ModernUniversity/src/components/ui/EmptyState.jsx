import React from 'react';
import PropTypes from 'prop-types';

export const EmptyState = ({ title, message, icon = null }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-muted mb-4">
        {icon || (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
      </div>
      <h3 className="font-heading text-lg font-bold text-text mb-1">{title}</h3>
      <p className="text-sm text-muted max-w-sm">{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.node
};
