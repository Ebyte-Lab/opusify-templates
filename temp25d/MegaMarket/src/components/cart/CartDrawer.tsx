import React, { useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { CartOverlay } from './CartOverlay';
import { CartLineItem } from './CartLineItem';
import { Button } from '../ui/Button';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { items, isOpen, close, totalPrice, totalCount, removeItem } = useCart();

  // Lock body scroll while cart is active
  useLockBodyScroll(isOpen);

  // Trap Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return (
    <>
      <CartOverlay isOpen={isOpen} onClick={close} />
      <div
        id="cart-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-secondary z-[70] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-heading text-xl font-bold text-text flex items-center gap-2">
            <ShoppingCart size={24} />
            Shopping Cart
          </h2>
          <Button
            variant="secondary"
            onClick={close}
            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-gray-200 border-none bg-transparent shadow-none"
            aria-label="Close cart drawer"
          >
            <X size={24} />
          </Button>
        </div>

        <div id="cart-items" className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div id="empty-cart-msg" className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
              <ShoppingCart size={48} strokeWidth={1} />
              <span className="text-lg font-medium">Your cart is empty.</span>
            </div>
          ) : (
            items.map((item) => (
              <CartLineItem key={item.id} item={item} onRemove={removeItem} />
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base text-gray-600 font-bold">
              Subtotal (<span id="cart-count-text">{totalCount}</span> items):
            </span>
            <span id="cart-total" className="font-bold text-2xl text-priceAccent">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <Button
            variant="cta"
            onClick={onCheckout}
            id="checkout-btn"
            fullWidth
            className="rounded-md py-3 text-sm font-bold shadow-sm"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
export default CartDrawer;
