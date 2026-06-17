import React from 'react';

interface BadgeProps {
  variant: 'best-seller' | 'prime' | 'standard-shipping';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, className = '' }) => {
  if (variant === 'best-seller') {
    return (
      <div className={`bg-bestSellerBadge text-white text-[10px] font-bold px-2 py-1 uppercase rounded-br-sm ${className}`}>
        Best Seller
      </div>
    );
  }

  if (variant === 'prime') {
    return (
      <div className={`text-xs font-bold italic text-blue-500 select-none ${className}`}>
        MEGA<span className="text-primary">PRIME</span>
      </div>
    );
  }

  return (
    <div className={`text-xs text-gray-500 select-none ${className}`}>
      Standard Shipping
    </div>
  );
};
export default Badge;
