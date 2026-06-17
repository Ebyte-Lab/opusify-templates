import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

interface MiniCartProps {
  onCheckout: () => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({ onCheckout }) => {
  const { cartItems, cartTotal, isCartOpen, removeFromCart, closeCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-bg heavy-border z-[70] transform transition-transform duration-300 flex flex-col ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-label="Shopping stash drawer"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between p-6 heavy-border-b bg-primary text-text">
        <h2 className="font-heading text-3xl">YOUR STASH</h2>
        <button
          onClick={closeCart}
          className="text-text hover:text-bg transition-colors focus:outline-none brutal-hover p-1"
          aria-label="Close cart"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem
              key={`${item.id}-${index}`}
              item={item}
              index={index}
              onRemove={removeFromCart}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-secondary space-y-4">
            <span className="font-heading text-5xl opacity-50">EMPTY</span>
            <span className="text-sm font-bold tracking-widest text-text">ADD HEAT TO CART</span>
          </div>
        )}
      </div>

      <div className="p-6 heavy-border-t bg-bg">
        <div className="flex justify-between items-end mb-6 font-heading text-2xl">
          <span>TOTAL:</span>
          <span className="text-primary">${cartTotal.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className="w-full bg-text text-bg py-4 font-heading text-2xl brutal-hover brutal-hover-invert disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none disabled:hover:bg-text disabled:hover:text-bg"
        >
          CHECKOUT SECURELY
        </button>
      </div>
    </div>
  );
};

export default MiniCart;
