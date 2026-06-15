// src/components/layout/Navbar.tsx
import React from 'react';
import { Menu } from 'lucide-react';
import { navLinks } from '../../data/navLinks';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import MobileMenu from './MobileMenu';

export const Navbar: React.FC = () => {
  const sectionIds = navLinks.map(link => link.href.substring(1));
  const activeSection = useActiveSection(sectionIds);
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <>
      <header className="sticky top-0 z-45 bg-bg/90 backdrop-blur-sm border-b border-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16" aria-label="Main Navigation">
            <div className="flex-shrink-0 font-heading font-bold text-xl tracking-tighter">
              <span className="text-text">&gt;_</span>
              <span className="text-primary">OPUSIFY</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`font-heading hover:text-primary transition-colors px-3 py-2 text-sm font-medium ${
                        isActive ? 'text-primary' : 'text-text'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={toggle}
                className="text-text hover:text-primary focus:outline-none transition-colors p-1 rounded focus:ring-1 focus:ring-primary"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        onClose={close}
        links={navLinks}
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
