import React from 'react';
import PropTypes from 'prop-types';

export const ProgressBar = ({ value, label = '', color = 'bg-primary' }) => {
  const percent = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1 text-xs font-semibold text-muted">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  color: PropTypes.string
};
