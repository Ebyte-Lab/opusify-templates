import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'checkout';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  let baseStyle = 'font-heading tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ';
  
  if (variant === 'primary') {
    baseStyle += 'bg-primary text-bg text-sm px-8 py-4 hover:bg-white shadow-[0_0_20px_rgba(0,229,255,0.4)]';
  } else if (variant === 'secondary') {
    baseStyle += 'neon-border text-white text-sm px-8 py-4 flex items-center justify-center gap-2 hover:bg-secondary/20';
  } else if (variant === 'outline') {
    baseStyle += 'border border-secondary hover:border-primary text-text hover:text-primary px-3 py-1 font-mono text-xs flex items-center gap-1';
  } else if (variant === 'checkout') {
    baseStyle += 'bg-primary/10 border border-primary text-primary py-4 text-sm hover:bg-primary hover:text-bg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary/10 disabled:hover:text-primary shadow-[0_0_15px_rgba(0,229,255,0.2)]';
  }

  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
