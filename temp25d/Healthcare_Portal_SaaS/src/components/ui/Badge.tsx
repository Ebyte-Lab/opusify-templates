import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'stable' | 'pending' | 'critical' | 'warning' | 'inactive' | 'brand';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'stable', dot = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
            {
              'bg-emerald-50 text-emerald-700 border-emerald-200/50': variant === 'stable',
              'bg-indigo-50 text-indigo-700 border-indigo-200/50': variant === 'pending',
              'bg-red-50 text-red-700 border-red-200/50': variant === 'critical',
              'bg-amber-50 text-amber-700 border-amber-200/50': variant === 'warning',
              'bg-slate-100 text-slate-600 border-slate-200': variant === 'inactive',
              'bg-brand-50 text-brand-700 border-brand-200/50': variant === 'brand',
            },
            className
          )
        )}
        {...props}
      >
        {dot && (
          <span
            className={clsx('h-1.5 w-1.5 rounded-full', {
              'bg-emerald-500': variant === 'stable',
              'bg-indigo-500': variant === 'pending',
              'bg-red-500 pulse-critical': variant === 'critical',
              'bg-amber-500': variant === 'warning',
              'bg-slate-400': variant === 'inactive',
              'bg-brand-500': variant === 'brand',
            })}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
