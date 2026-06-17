import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { CartLineItem } from './CartLineItem';
import { Button } from '../ui/Button';

interface CartDrawerProps {
  onInitializeCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onInitializeCheckout }) => {
  const { items, isOpen, close, totalPrice, removeItem, updateQty } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);

  // Return focus to the trigger element when closed
  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement;
    } else {
      lastActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key === 'Tab') {
        const drawer = drawerRef.current;
        if (!drawer) return;

        const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusables = drawer.querySelectorAll<HTMLElement>(focusableSelectors);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Initial focus placement
    setTimeout(() => {
      const closeBtn = drawerRef.current?.querySelector('button');
      if (closeBtn) closeBtn.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  const handleCheckoutInit = () => {
    if (items.length === 0) return;
    close();
    setTimeout(() => {
      onInitializeCheckout();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart Drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-bg border-l border-secondary z-[70] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.5)] focus:outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary bg-secondary/30">
            <h2 className="font-heading text-xl text-primary flex items-center gap-2">
              <ShoppingBag size={20} />
              SYSTEM_CART
            </h2>
            <button
              onClick={close}
              className="text-text hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none p-1"
              aria-label="Close Shopping Cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQty={updateQty}
                />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-text/40 space-y-4">
                <span className="font-heading text-sm tracking-widest animate-pulse">AWAITING_INPUT</span>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          <div className="p-6 border-t border-secondary bg-bg">
            <div className="flex justify-between items-end mb-6">
              <span className="text-xs tracking-widest font-heading text-text/60">SUBTOTAL</span>
              <span className="font-heading text-2xl text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              variant="checkout"
              onClick={handleCheckoutInit}
              className="w-full"
              disabled={items.length === 0}
            >
              INITIALIZE_CHECKOUT
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
