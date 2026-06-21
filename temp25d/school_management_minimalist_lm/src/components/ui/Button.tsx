import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'font-heading font-medium rounded-lg transition-colors focus:outline-none flex items-center justify-center gap-2',
        {
          'bg-primary hover:bg-teal-600 text-white': variant === 'primary',
          'bg-secondary hover:bg-slate-200 text-text': variant === 'secondary',
          'border border-secondary hover:bg-secondary text-text': variant === 'outline',
          'hover:bg-secondary text-text/70 hover:text-text': variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-xs': size === 'sm',
          'px-6 py-2.5 text-sm': size === 'md',
          'px-8 py-3 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
