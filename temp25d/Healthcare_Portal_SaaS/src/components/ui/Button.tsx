import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center font-display font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
            {
              // Variant styles
              'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow': variant === 'primary',
              'bg-surface-elevated hover:bg-surface-border text-brand-900 border border-surface-border': variant === 'secondary',
              'bg-transparent hover:bg-brand-50/50 text-brand-600 border border-brand-500/30 hover:border-brand-500': variant === 'outline',
              'bg-status-critical hover:bg-red-600 text-white shadow-sm': variant === 'destructive',
              'bg-transparent hover:bg-brand-50/40 text-brand-600': variant === 'ghost',
              
              // Size styles
              'px-3 py-1.5 text-xs': size === 'sm',
              'px-4 py-2 text-sm': size === 'md',
              'px-5 py-2.5 text-base': size === 'lg',
            },
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
