import React from 'react';

interface CircularProgressProps {
  value: number;       // 0–100
  color?: string;      // stroke color class e.g. "text-primary" or "text-blue-500"
  size?: number;       // px, default 64
  strokeWidth?: number; // default 4
  label?: string;      // center label override
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  color = 'text-primary',
  size = 64,
  strokeWidth = 4,
  label
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          className="text-slate-100 stroke-current"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        {/* Progress Fill */}
        <circle
          className={`${color} stroke-current circle-progress`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </svg>
      {/* Central label */}
      <span className="absolute text-[10px] font-extrabold text-text font-heading">
        {label || `${Math.round(value)}%`}
      </span>
    </div>
  );
};
