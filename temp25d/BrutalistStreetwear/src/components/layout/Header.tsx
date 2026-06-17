import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { NAV_LINKS } from '../../data/products';

export const Header: React.FC = () => {
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg heavy-border-b">
      <div className="flex items-center justify-between h-[73px] md:h-[81px]">
        {/* Mobile Menu Btn */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-4 heavy-border-r text-text hover:text-primary transition-colors focus:outline-none h-full flex items-center justify-center"
          aria-label="Toggle navigation menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Logo */}
        <a
          href="#latest"
          onClick={(e) => handleNavClick(e, '#latest')}
          className="px-4 md:px-8 font-heading text-3xl md:text-5xl text-primary tracking-wider hover:text-text transition-colors select-none h-full flex items-center justify-center"
        >
          [O]PUSIFY
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 heavy-border-l h-full items-stretch">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link flex-1 py-6 text-center text-sm font-bold uppercase heavy-border-r hover:bg-text hover:text-bg transition-colors h-full flex items-center justify-center"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Cart Icon */}
        <button
          onClick={openCart}
          className="px-4 md:px-8 heavy-border-l text-text hover:bg-primary hover:text-bg transition-colors focus:outline-none relative group h-full flex items-center"
          aria-label={`Open cart. Contains ${cartCount} items`}
        >
          <span className="font-heading text-2xl hidden md:block mr-3">CART</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">
            <path d="M6 2L3 6v14h18V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span
            id="cart-badge"
            className="absolute top-2 right-2 md:top-4 md:right-4 w-5 h-5 bg-text text-bg text-[10px] font-bold flex items-center justify-center border-2 border-bg group-hover:border-primary"
          >
            {cartCount}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-bg w-full border-t-2 border-text transition-all duration-300`}
      >
        <nav className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="p-4 text-left font-bold uppercase border-b-2 border-secondary hover:bg-primary hover:text-bg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
