import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string; // tailwind color prefix, e.g., "primary", "blue", "green"
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'primary',
  className = '',
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    rose: 'bg-rose-400',
  };

  const selectedColor = colors[color as keyof typeof colors] || 'bg-primary';

  return (
    <div className={`w-full bg-gray-100 rounded-full h-4 overflow-hidden border border-gray-200/50 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${selectedColor}`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
};
export default ProgressBar;
