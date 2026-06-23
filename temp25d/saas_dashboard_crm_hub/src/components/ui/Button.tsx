import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-bold transition-all outline-none disabled:opacity-50 disabled:pointer-events-none';

  const variantStyles = {
    primary: 'bg-primary hover:bg-pink-600 text-white shadow-lg shadow-primary/20 rounded-xl',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl',
    ghost: 'border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl',
    icon: 'bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl p-2.5'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs uppercase tracking-wider',
    md: 'px-4 py-2.5 text-xs uppercase tracking-wider',
    lg: 'px-6 py-3.5 text-sm uppercase tracking-wider',
  };

  // Icon buttons might not need text sizing/padding in the same way, but sizeStyles works
  const appliedVariant = variantStyles[variant];
  const appliedSize = variant === 'icon' ? '' : sizeStyles[size];

  return (
    <button
      className={`${baseStyles} ${appliedVariant} ${appliedSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
