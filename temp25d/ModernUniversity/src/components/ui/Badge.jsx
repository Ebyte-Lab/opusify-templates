import React from 'react';
import PropTypes from 'prop-types';

export const Badge = ({ label, color = 'gray' }) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    gray: 'bg-gray-50 text-gray-600 border-gray-200',
    navy: 'bg-blue-900/10 text-primary border-blue-900/20'
  };

  const classes = colorClasses[color] || colorClasses.gray;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['green', 'amber', 'red', 'blue', 'gray', 'navy'])
};
