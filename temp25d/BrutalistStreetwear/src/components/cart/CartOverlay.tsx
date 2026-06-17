import React from 'react';
import { useCart } from '../../context/CartContext';

export const CartOverlay: React.FC = () => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div
      onClick={closeCart}
      className={`fixed inset-0 bg-black/80 z-[60] transition-opacity duration-300 backdrop-blur-sm ${
        isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden="true"
    />
  );
};

export default CartOverlay;
