import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`bg-white/90 backdrop-blur text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm inline-block ${className}`}
    >
      {children}
    </span>
  );
};
