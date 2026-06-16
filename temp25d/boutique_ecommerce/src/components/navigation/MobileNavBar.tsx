import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { navLinks } from '@/data/navLinks';
import { AnimatePresence, motion } from 'framer-motion';

export default function MobileNavBar() {
  const { toggle } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center md:hidden mb-6 relative">
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="text-bg hover:text-primary transition-colors focus:outline-none mix-blend-difference z-50 p-1"
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="font-heading text-xl uppercase tracking-[0.2em] text-bg mix-blend-difference">
        Atelier
      </div>

      <button
        onClick={toggle}
        className="text-bg hover:text-primary transition-colors focus:outline-none relative mix-blend-difference p-1"
        aria-label="Open Cart"
      >
        <ShoppingBag size={22} />
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full"></span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-12 left-0 w-full bg-bg border border-secondary shadow-lg z-40 py-6 px-8 flex flex-col gap-4 text-left"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-sm uppercase tracking-widest text-text hover:text-primary transition-colors duration-300 py-2 border-b border-secondary/50 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
