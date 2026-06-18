import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'chunky' | 'outline' | 'ghost' | 'chunky-secondary';
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'chunky',
  to,
  href,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-heading font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50';
  
  const variants = {
    chunky: 'bg-primary text-text shadow-chunky hover:-translate-y-0.5 active:translate-y-1 hover:bg-yellow-400 btn-chunky',
    'chunky-secondary': 'bg-secondary text-pink-900 shadow-chunky hover:-translate-y-0.5 active:translate-y-1 hover:bg-rose-200 btn-chunky',
    outline: 'bg-white border-2 border-gray-200 text-text hover:bg-gray-50 hover:border-gray-300',
    ghost: 'text-gray-500 hover:text-text hover:bg-gray-100',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
export default Button;
