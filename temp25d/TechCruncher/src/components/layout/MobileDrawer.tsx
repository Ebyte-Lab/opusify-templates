import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-primary py-2 font-heading text-xs uppercase tracking-widest'
      : 'text-text/60 hover:text-primary py-2 font-heading text-xs uppercase tracking-widest transition-all';

  return (
    <>
      {/* Drawer Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 block' : 'opacity-0 hidden'
        }`}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-bg border-r border-borderCol z-50 transform transition-transform duration-300 ease-in-out flex flex-col p-6 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-borderCol mb-6">
          <span className="font-heading tracking-tight text-lg text-text">
            TECH<span className="text-primary">CRUNCHER</span>
          </span>
          <button onClick={onClose} className="p-2 text-text/60" aria-label="Close Menu">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          <NavLink to="/" onClick={onClose} className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/news" onClick={onClose} className={getLinkClass}>
            News
          </NavLink>
          <NavLink to="/reviews" onClick={onClose} className={getLinkClass}>
            Reviews
          </NavLink>
          <NavLink to="/podcasts" onClick={onClose} className={getLinkClass}>
            Podcasts
          </NavLink>
          <NavLink to="/events" onClick={onClose} className={getLinkClass}>
            Events
          </NavLink>
          <NavLink to="/subscribe" onClick={onClose} className={getLinkClass}>
            Subscribe
          </NavLink>
        </nav>
      </div>
    </>
  );
};
export default MobileDrawer;
