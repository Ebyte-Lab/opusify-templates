import React from 'react';
import PropTypes from 'prop-types';
import { useAnimatedValue } from '../../hooks/useAnimatedValue';

export const DonutChart = ({ percent = 71, earned = 86, inProgress = 15, required = 120 }) => {
  const animatedPercent = useAnimatedValue(percent, 1000, 100);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center relative h-full">
      <h2 className="font-heading text-xl font-bold text-text w-full mb-6 border-b border-gray-100 pb-2">
        Degree Progress
      </h2>

      <div
        className="relative w-48 h-48 flex items-center justify-center mb-6"
        role="img"
        aria-label={`Degree progress: ${percent}% complete`}
      >
        {/* Background SVG */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          {/* Background track */}
          <path
            className="text-gray-100 stroke-current"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Progress track */}
          <path
            className="text-primary stroke-current chart-circle"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{ strokeDasharray: `${animatedPercent}, 100` }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-primary">{animatedPercent}%</span>
          <span className="text-xs text-muted uppercase tracking-wide font-semibold">Complete</span>
        </div>
      </div>

      <div className="w-full space-y-3 mt-auto">
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted">Earned</span>
          </span>
          <span className="font-bold text-text">{earned} Credits</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-muted">In Progress</span>
          </span>
          <span className="font-bold text-text">{inProgress} Credits</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="text-muted">Required</span>
          </span>
          <span className="font-bold text-text">{required} Credits</span>
        </div>
      </div>
    </div>
  );
};

DonutChart.propTypes = {
  percent: PropTypes.number,
  earned: PropTypes.number,
  inProgress: PropTypes.number,
  required: PropTypes.number
};
