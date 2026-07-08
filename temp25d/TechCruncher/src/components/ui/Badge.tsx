import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary' }) => {
  if (variant === 'danger') {
    return (
      <span className="bg-red-600 text-white font-heading text-[10px] uppercase tracking-widest px-3 py-1.5 rounded shadow-lg">
        {children}
      </span>
    );
  }

  return (
    <span className="text-xs font-semibold text-primary uppercase tracking-widest">
      {children}
    </span>
  );
};
export default Badge;
