import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useSmoothScrollNav } from '../../hooks/useSmoothScrollNav';

export const Header: React.FC = () => {
  const { totalCount, open: openCart } = useCart();
  const scrollToSection = useSmoothScrollNav();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSupportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isHome =
      window.location.hash === '' ||
      window.location.hash === '#/' ||
      !window.location.hash.includes('category');
    if (isHome) {
      e.preventDefault();
      scrollToSection('support');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg/90 backdrop-blur-md border-b border-secondary">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#/"
          className="font-heading text-2xl text-white flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded outline-none"
        >
          <div className="w-8 h-8 bg-primary rounded transform group-hover:rotate-45 transition-transform duration-300 flex items-center justify-center">
            <div className="w-3 h-3 bg-bg rounded-full"></div>
          </div>
          NEXUS<span className="text-primary">GEAR</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#/category/laptops"
            className="font-heading text-xs tracking-widest hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded outline-none"
          >
            LAPTOPS
          </a>
          <a
            href="#/category/audio"
            className="font-heading text-xs tracking-widest hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded outline-none"
          >
            AUDIO
          </a>
          <a
            href="#/category/accessories"
            className="font-heading text-xs tracking-widest hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded outline-none"
          >
            ACCESSORIES
          </a>
          <a
            href="#support"
            onClick={handleSupportClick}
            className="font-heading text-xs tracking-widest hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded outline-none"
          >
            SUPPORT
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded outline-none p-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button
            onClick={openCart}
            className="relative text-text hover:text-primary transition-colors group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded outline-none p-1"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag size={24} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-bg font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg border-b border-secondary px-6 py-4 flex flex-col space-y-4">
          <a
            href="#/category/laptops"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-sm tracking-widest hover:text-primary transition-colors py-2 focus-visible:ring-2 focus-visible:ring-primary rounded outline-none block"
          >
            &gt; LAPTOPS
          </a>
          <a
            href="#/category/audio"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-sm tracking-widest hover:text-primary transition-colors py-2 focus-visible:ring-2 focus-visible:ring-primary rounded outline-none block"
          >
            &gt; AUDIO
          </a>
          <a
            href="#/category/accessories"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-sm tracking-widest hover:text-primary transition-colors py-2 focus-visible:ring-2 focus-visible:ring-primary rounded outline-none block"
          >
            &gt; ACCESSORIES
          </a>
          <a
            href="#support"
            onClick={handleSupportClick}
            className="font-heading text-sm tracking-widest hover:text-primary transition-colors py-2 focus-visible:ring-2 focus-visible:ring-primary rounded outline-none block"
          >
            &gt; SUPPORT
          </a>
        </div>
      )}
    </header>
  );
};
