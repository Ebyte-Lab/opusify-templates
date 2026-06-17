import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'white';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-primary text-bg hover:bg-text hover:shadow-float py-4 px-8',
    secondary: 'bg-secondary/30 text-primary hover:bg-secondary/50 py-4 px-8',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-bg py-4 px-8',
    text: 'text-text hover:text-primary transition-colors',
    white: 'bg-white text-primary hover:bg-secondary transition-colors py-3 px-8 shadow-sm',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
