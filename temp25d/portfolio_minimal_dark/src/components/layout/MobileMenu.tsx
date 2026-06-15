// src/components/layout/MobileMenu.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { NavLink } from '../../types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  activeSection: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  activeSection,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-secondary p-6 md:hidden shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="font-heading font-bold text-xl tracking-tighter">
                <span className="text-text">&gt;_</span>
                <span className="text-primary">OPUSIFY</span>
              </div>
              <button
                onClick={onClose}
                className="text-text hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary p-1 rounded"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 pb-6">
              {links.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`font-heading text-lg font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-text'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
