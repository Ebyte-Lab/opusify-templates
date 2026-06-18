import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'github';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded font-bold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/80 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    secondary: 'bg-secondary text-white hover:bg-white/10 border border-white/10',
    ghost: 'text-text/70 hover:text-white hover:bg-secondary/50',
    github: 'bg-[#24292e] text-white hover:bg-[#2f363d] border border-white/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[11px] leading-none',
    md: 'px-4 py-2 text-xs font-bold',
    lg: 'px-6 py-3 text-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
