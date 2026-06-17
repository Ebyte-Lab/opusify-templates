import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'bundle' | 'chrome' | 'text';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', fullWidth = false, className = '', ...props }, ref) => {
    const baseStyle = 'inline-flex items-center justify-center font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-primary hover:bg-orange-600 text-white px-6 py-2.5 shadow-sm rounded-md text-sm',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-text px-6 py-2 border border-gray-300 shadow-sm rounded-md text-sm',
      cta: 'bg-cta hover:bg-ctaHover text-text py-2 px-6 border border-ctaBorder shadow-sm text-sm',
      bundle: 'bg-bundleCta hover:bg-bundleCtaHover text-text px-6 py-2 border border-bundleCtaBorder shadow-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] text-sm rounded-md',
      chrome: 'bg-chromeFooterBtn hover:bg-chromeFooterBtnHover text-white py-4 text-sm font-medium',
      text: 'text-blue-600 hover:text-red-600 hover:underline font-medium text-xs bg-transparent border-none p-0',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variants[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
