import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  let baseStyle = "text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded transition-all focus:outline-none ";
  
  if (variant === 'primary') {
    // Yellow 400 accent base
    baseStyle += "bg-primary text-black border border-primary hover:bg-transparent hover:text-primary";
  } else if (variant === 'ghost') {
    // Zinc 900 base
    baseStyle += "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white";
  } else if (variant === 'danger') {
    // Red 950 base
    baseStyle += "bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-800/40";
  }

  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
