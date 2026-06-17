import React from 'react';

interface PriceTagProps {
  price: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price, size = 'md', className = '' }) => {
  const dollars = Math.floor(price);
  const cents = (price % 1).toFixed(2).substring(2);

  const sizeClasses = {
    sm: {
      container: 'text-sm font-bold',
      dollarSign: 'text-[10px] mt-0.5',
      cents: 'text-[10px] mt-0.5',
    },
    md: {
      container: 'text-base font-bold',
      dollarSign: 'text-[11px] mt-0.5',
      cents: 'text-[11px] mt-0.5',
    },
    lg: {
      container: 'text-xl font-bold',
      dollarSign: 'text-xs mt-1',
      cents: 'text-xs mt-1',
    },
    xl: {
      container: 'text-2xl',
      dollarSign: 'text-xs mt-1',
      cents: 'text-xs mt-1',
    },
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={`flex items-start leading-none ${selectedSize.container} ${className}`}>
      <span className={`self-start font-normal ${selectedSize.dollarSign}`}>$</span>
      <span className="font-normal">{dollars.toLocaleString()}</span>
      <span className={`self-start font-normal ${selectedSize.cents}`}>{cents}</span>
    </div>
  );
};
export default PriceTag;
