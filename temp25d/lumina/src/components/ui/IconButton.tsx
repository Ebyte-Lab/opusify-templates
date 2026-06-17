import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`p-2 rounded-full text-text/50 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
