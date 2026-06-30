import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
            {
              // Variants
              'bg-brand-500 text-white hover:bg-brand-600 border border-brand-500/10 shadow-lg shadow-brand-500/10': variant === 'primary',
              'bg-surface-elevated text-gray-200 hover:bg-surface-border border border-surface-border': variant === 'secondary',
              'bg-transparent border border-surface-border text-gray-300 hover:bg-surface-card hover:text-white': variant === 'outline',
              'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-surface-card': variant === 'ghost',
              'bg-accent-rose text-white hover:bg-red-600 shadow-lg shadow-accent-rose/10': variant === 'danger',
              
              // Sizes
              'px-3 py-1.5 text-xs gap-1.5': size === 'sm',
              'px-4 py-2.5 text-sm gap-2': size === 'md',
              'px-6 py-3.5 text-base gap-2.5': size === 'lg',
            },
            className
          )
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
