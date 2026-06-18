import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'blue' | 'green' | 'red' | 'orange' | 'gray';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const colors = {
    primary: 'bg-primary/20 text-yellow-700 border-primary/30',
    secondary: 'bg-secondary/40 text-pink-700 border-secondary',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    gray: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border-2 inline-flex items-center gap-1.5 ${colors[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
export default Badge;
