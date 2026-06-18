import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Star } from 'lucide-react';
import { ChildSwitcher } from './ChildSwitcher';
import { useMessages } from '../../hooks/useMessages';

interface HeaderProps {
  onOpenMobileNav: () => void;
  onOpenQuickMessages: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileNav,
  onOpenQuickMessages,
}) => {
  const { totalUnreadCount } = useMessages();

  return (
    <header className="bg-white border-b-4 border-gray-100 sticky top-0 z-40 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-chunky text-white transform group-hover:-translate-y-1 transition-transform duration-150">
            <Star size={24} fill="currentColor" stroke="none" />
          </div>
          <span className="font-heading text-2xl tracking-tight text-text">
            SunnySide <span className="text-primary">Academy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border-2 border-gray-100">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all ${
                isActive
                  ? 'bg-white text-text shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-text hover:bg-gray-100'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/classes"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all ${
                isActive
                  ? 'bg-white text-text shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-text hover:bg-gray-100'
              }`
            }
          >
            Classes
          </NavLink>
          <NavLink
            to="/grades"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all ${
                isActive
                  ? 'bg-white text-text shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-text hover:bg-gray-100'
              }`
            }
          >
            Grades
          </NavLink>
          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all ${
                isActive
                  ? 'bg-white text-text shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-text hover:bg-gray-100'
              }`
            }
          >
            Attendance
          </NavLink>
          
          <button
            onClick={onOpenQuickMessages}
            className="px-5 py-2.5 rounded-full font-heading font-bold text-sm text-gray-500 hover:text-text hover:bg-gray-100 transition-colors relative flex items-center gap-1 focus:outline-none"
            aria-label="Open quick messages peek"
          >
            Messages
            {totalUnreadCount > 0 ? (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            ) : null}
          </button>
        </nav>

        {/* User Profile, Child Switcher & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Child Switcher dropdown */}
          <ChildSwitcher />

          {/* Static Parent Avatar Chip (Desktop only) */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-2xl border border-gray-100">
            <img
              src="https://picsum.photos/seed/parent1/100/100"
              alt="Sarah Miller"
              className="w-8 h-8 rounded-full border border-white object-cover"
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">Parent</span>
              <span className="text-xs font-bold text-gray-700 leading-tight">Sarah M.</span>
            </div>
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-text hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Open navigation drawer"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
