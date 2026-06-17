import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [lines, setLines] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useLockBodyScroll(isOpen);

  const allLines = [
    '> Encrypting payment data... [OK]',
    '> Allocating inventory... [OK]',
    '> Dispatch sequence initiated.',
  ];

  // Return focus on close
  useEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement;
    } else {
      lastActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Terminal typing logs and keyboard handlers
  useEffect(() => {
    if (!isOpen) {
      setLines([]);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    allLines.forEach((line, index) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, (index + 1) * 500);
      timers.push(t);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableSelectors = 'button, [tabindex]:not([tabindex="-1"])';
        const focusables = modal.querySelectorAll<HTMLElement>(focusableSelectors);
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

    // Set focus to the primary action button
    setTimeout(() => {
      const ackBtn = modalRef.current?.querySelector('button');
      if (ackBtn) ackBtn.focus();
    }, 50);

    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/90"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Transaction Complete Modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="bg-secondary border border-primary p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,229,255,0.2)] focus:outline-none"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary animate-pulse">
                <Check size={24} />
              </div>
              <h3 className="font-heading text-2xl text-white">TRANSACTION_COMPLETE</h3>
            </div>

            <div className="font-mono text-xs text-primary/80 mb-8 space-y-2 bg-bg p-4 rounded border border-secondary min-h-[110px]">
              {lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <p className="animate-pulse">_</p>
            </div>

            <button
              onClick={onClose}
              className="w-full border border-text/30 text-text py-3 hover:border-primary hover:text-primary transition-colors font-heading text-sm tracking-widest focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
            >
              ACKNOWLEDGE
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
