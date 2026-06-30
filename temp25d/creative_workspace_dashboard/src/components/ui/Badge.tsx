import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'purple' | 'gray';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  children,
  variant = 'gray',
  size = 'md',
  ...props
}) => {
  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full font-bold uppercase tracking-wider',
          {
            // Variants
            'bg-accent-teal/10 text-accent-teal border border-accent-teal/20': variant === 'success',
            'bg-accent-amber/10 text-accent-amber border border-accent-amber/20': variant === 'warning',
            'bg-accent-rose/10 text-accent-rose border border-accent-rose/20': variant === 'error',
            'bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20': variant === 'info',
            'bg-brand-500/10 text-brand-400 border border-brand-500/20': variant === 'purple',
            'bg-surface-elevated text-gray-400 border border-surface-border': variant === 'gray',

            // Sizes
            'px-2 py-0.5 text-[9px]': size === 'sm',
            'px-2.5 py-1 text-[10px]': size === 'md',
          },
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
