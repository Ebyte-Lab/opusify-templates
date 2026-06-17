import React, { useEffect, useRef } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the button immediately for accessibility
      buttonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/90 z-[100] flex items-center justify-center transition-opacity duration-300 px-4 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className={`bg-primary text-text heavy-border w-full max-w-lg p-8 text-center transform transition-transform duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <h3 id="checkout-modal-title" className="font-heading text-5xl mb-2">ORDER SECURED</h3>
        <div className="w-full h-2 bg-text mb-6"></div>
        <p className="text-sm font-bold mb-8 uppercase">
          Your heat is being processed. Tracking number incoming via encrypted transmission.
        </p>
        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          className="bg-bg text-text heavy-border px-8 py-3 font-heading text-xl brutal-hover w-full focus:outline-none"
        >
          ACKNOWLEDGE
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
