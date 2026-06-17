import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure the DOM elements are fully drawn and focusable
      const timer = setTimeout(() => {
        buttonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 bg-text/70 z-[100] flex items-center justify-center transition-opacity duration-300 px-4"
    >
      <div className="bg-secondary max-w-md w-full p-8 rounded-lg text-center transform transition-transform duration-300 shadow-xl scale-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 id="checkout-modal-title" className="font-heading text-2xl font-bold mb-2 text-text">
          Order Placed Successfully!
        </h3>
        <p className="text-gray-600 mb-6 text-sm">
          Thank you for shopping with MegaMarket. Your confirmation email is on its way.
        </p>
        <Button
          ref={buttonRef}
          variant="secondary"
          onClick={onClose}
          className="w-full font-bold text-sm border border-gray-300"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
export default CheckoutModal;
