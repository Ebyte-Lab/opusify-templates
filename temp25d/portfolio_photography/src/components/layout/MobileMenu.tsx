import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from '../ui/NavLink';
import { navLinks } from '../../data/navLinks';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  useBodyScrollLock(isOpen);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const extendedLinks = [
    ...navLinks,
    { label: 'Booking', href: '#booking', variant: 'accent' as const }
  ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          ref={containerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-bg flex flex-col items-center justify-center outline-none"
        >
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-6 right-6 text-primary p-2 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <nav className="flex flex-col space-y-8 text-center text-xl font-heading">
            {extendedLinks.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                onClick={onClose}
              />
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
