import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartBadge } from '../cart/CartBadge';

interface FloatingNavbarProps {
  activeHash: string;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ activeHash }) => {
  const { toggle, totalCount } = useCart();

  const isHomeActive = activeHash === '' || activeHash === '#/' || activeHash === '#';

  return (
    <header className="fixed top-6 left-0 w-full z-50 px-4 flex justify-center pointer-events-none">
      <div className="bg-white/80 backdrop-blur-md shadow-soft rounded-full px-6 py-3 flex items-center gap-4 md:gap-8 border border-white pointer-events-auto">
        {/* Logo */}
        <a
          href="#/"
          className="font-heading text-2xl font-semibold text-primary mr-1 md:mr-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md"
        >
          Lumina.
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-5">
          <a
            href="#/"
            className={`nav-link text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md ${
              isHomeActive ? 'text-primary' : 'text-text/70 hover:text-primary'
            }`}
          >
            Home
          </a>
          <a
            href="#/all-products"
            className={`nav-link text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md ${
              activeHash === '#/all-products' ? 'text-primary' : 'text-text/70 hover:text-primary'
            }`}
          >
            All Products
          </a>
          <a
            href="#/skincare"
            className={`nav-link text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md ${
              activeHash === '#/skincare' ? 'text-primary' : 'text-text/70 hover:text-primary'
            }`}
          >
            Skincare
          </a>
          <a
            href="#/supplements"
            className={`nav-link text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md ${
              activeHash === '#/supplements' ? 'text-primary' : 'text-text/70 hover:text-primary'
            }`}
          >
            Supplements
          </a>
          <a
            href="#/bundles"
            className={`nav-link text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md ${
              activeHash === '#/bundles' ? 'text-primary' : 'text-text/70 hover:text-primary'
            }`}
          >
            Bundles
          </a>
          <a
            href="#/gift-cards"
            className={`nav-link text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md ${
              activeHash === '#/gift-cards' ? 'text-primary' : 'text-text/70 hover:text-primary'
            }`}
          >
            Gift Cards
          </a>
        </nav>

        {/* Mobile Navigation fallback */}
        <nav className="flex lg:hidden items-center space-x-3">
          <a
            href="#/all-products"
            className={`text-xs font-semibold ${
              activeHash === '#/all-products' ? 'text-primary' : 'text-text/70'
            }`}
          >
            Shop
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 border-l border-secondary/50 pl-3 md:pl-6">
          <a
            href="#account"
            className="text-text hover:text-primary transition-colors hidden sm:block text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-md"
          >
            Account
          </a>
          <button
            onClick={toggle}
            aria-label={`Open shopping cart. ${totalCount} items in basket`}
            className="relative text-text hover:text-primary transition-colors flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            <ShoppingBag className="w-5 h-5" />
            <CartBadge count={totalCount} />
          </button>
        </div>
      </div>
    </header>
  );
};
