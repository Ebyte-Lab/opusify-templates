import React, { useEffect, useRef } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { IconButton } from '../ui/IconButton';
import { Button } from '../ui/Button';
import { CartLineItem } from './CartLineItem';
import { CartOverlay } from './CartOverlay';

interface CartDrawerProps {
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckoutSuccess }) => {
  const { isOpen, close, items, removeItem, totalPrice } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector('button');
        closeBtn?.focus();
      }, 50);
    } else {
      previousFocus.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  const handleCheckoutClick = () => {
    onCheckoutSuccess();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && <CartOverlay isOpen={isOpen} onClick={close} />}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-bg z-[70] flex flex-col shadow-2xl rounded-l-3xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Your Basket"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary/30 bg-white/50 backdrop-blur-md">
              <h2 className="font-heading text-2xl text-primary font-medium">Your Basket</h2>
              <IconButton
                onClick={close}
                aria-label="Close basket"
                className="hover:bg-secondary/20 p-2 text-text/50 hover:text-primary"
              >
                <X className="w-6 h-6" />
              </IconButton>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-text/40 space-y-4">
                  <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-2">
                    <ShoppingBag className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-lg font-heading">Your basket is empty.</span>
                  <span className="text-sm">Let's find something natural for you.</span>
                </div>
              ) : (
                items.map((item) => (
                  <CartLineItem key={item.cartItemId} item={item} onRemove={removeItem} />
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-secondary/30 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)] rounded-tl-3xl relative">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg text-text/70">Subtotal</span>
                <span
                  id="cart-total"
                  className="font-heading text-2xl font-semibold text-primary"
                  aria-live="polite"
                >
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleCheckoutClick}
                disabled={items.length === 0}
                fullWidth
                className="py-4 text-lg"
              >
                Proceed to Checkout
              </Button>
              <p className="text-center text-sm text-text/50 mt-4 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                Carbon neutral shipping on all orders
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
