import React, { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';

export const CartBadge: React.FC = () => {
  const { totalCount } = useCart();
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (totalCount > 0) {
      setFlash(true);
      const timer = setTimeout(() => {
        setFlash(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  return (
    <span
      id="cart-badge"
      className={`absolute -top-1 right-0 font-bold text-sm px-1 rounded-full transition-all duration-300 ${
        flash
          ? 'bg-orange-500 text-white scale-110'
          : 'bg-[#131921] text-primary'
      }`}
    >
      {totalCount}
    </span>
  );
};
export default CartBadge;
