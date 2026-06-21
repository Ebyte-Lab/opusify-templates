import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-heading tracking-widest uppercase',
        {
          'bg-primary/10 text-primary': variant === 'primary',
          'bg-secondary text-text/70': variant === 'secondary',
          'border border-secondary text-text/50': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  );
};
