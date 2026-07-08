import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import ThemeToggleButton from '../ui/ThemeToggleButton';

interface NavbarProps {
  onMobileMenuOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-primary border-b-2 border-primary pb-1 transition-all'
      : 'text-text/60 hover:text-primary pb-1 transition-all';

  return (
    <header className="sticky top-0 bg-bg/95 backdrop-blur-md border-b border-borderCol z-40 py-4 px-6 md:px-12 flex items-center justify-between transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="font-heading text-xl md:text-2xl tracking-tighter uppercase text-text select-none hover:opacity-90 transition-opacity"
        >
          TECH<span className="text-primary">CRUNCHER</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-8 font-heading text-xs uppercase tracking-wider">
        <NavLink to="/news" className={getLinkClass}>
          News
        </NavLink>
        <NavLink to="/reviews" className={getLinkClass}>
          Reviews
        </NavLink>
        <NavLink to="/podcasts" className={getLinkClass}>
          Podcasts
        </NavLink>
        <NavLink to="/events" className={getLinkClass}>
          Events
        </NavLink>
        <NavLink to="/subscribe" className={getLinkClass}>
          Subscribe
        </NavLink>
      </nav>

      {/* Profile, Search, and Dark Mode Actions */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary border border-borderCol rounded-xl px-4 py-1.5 text-xs text-text placeholder:text-text/40 focus:outline-none focus:ring-1 focus:ring-primary w-48"
          />
        </form>

        {/* Theme Toggle */}
        <ThemeToggleButton />

        {/* Mobile Menu Trigger */}
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 text-text/80 hover:text-primary focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};
export default Navbar;
