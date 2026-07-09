import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubscribeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('newsletter-opt')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollToNewsletter: true } });
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Style', path: '/style' },
    { label: 'Wellness', path: '/wellness' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 bg-bg/90 backdrop-blur-md border-b border-secondary/40 z-50 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logotype */}
        <Link
          to="/"
          className="font-heading text-2xl lg:text-3xl tracking-[0.15em] uppercase font-light hover:opacity-80 transition-opacity"
        >
          THE_JOURNAL
        </Link>

        {/* Centralized navigation */}
        <nav className="hidden md:flex items-center gap-10 font-heading text-xs uppercase tracking-[0.25em] font-semibold text-text/70">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `transition-colors hover:text-primary pb-1 ${
                  isActive ? 'text-primary border-b border-primary/40' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions (Newsletter quick button) */}
        <div className="flex items-center gap-4">
          <a
            href="#newsletter-opt"
            onClick={handleSubscribeClick}
            className="hidden sm:inline-block font-heading text-[10px] tracking-[0.2em] uppercase font-bold border border-primary/50 text-text/80 px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Subscribe
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 text-text/80 hover:text-primary focus:outline-none"
            aria-label="Open navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
