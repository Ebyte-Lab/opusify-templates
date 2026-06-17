import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      // Focus the continue shopping button inside modal
      setTimeout(() => {
        const button = modalRef.current?.querySelector('button');
        button?.focus();
      }, 50);
    } else {
      previousFocus.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-text/40 z-[100] flex items-center justify-center backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Overlay backdrop */}
          <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-bg max-w-md w-full p-10 rounded-[2rem] text-center shadow-soft relative z-10"
          >
            <div className="w-20 h-20 bg-secondary/40 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Check className="w-8 h-8" />
            </div>
            <h3 id="modal-title" className="font-heading text-3xl mb-3 text-text">
              Order Confirmed
            </h3>
            <p className="text-text/70 mb-8 leading-relaxed">
              Thank you for choosing organic. Your products are being carefully packed in eco-friendly materials.
            </p>
            <button
              onClick={onClose}
              className="bg-primary text-bg px-8 py-3 rounded-full font-semibold hover:bg-text transition-colors w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
