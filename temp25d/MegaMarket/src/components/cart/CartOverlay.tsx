import React from 'react';

interface CartOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export const CartOverlay: React.FC<CartOverlayProps> = ({ isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 bg-text/50 z-[60] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden="true"
    />
  );
};
export default CartOverlay;
