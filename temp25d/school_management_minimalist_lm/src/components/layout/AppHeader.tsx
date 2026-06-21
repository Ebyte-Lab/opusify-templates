import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { FocusModeToggle } from './FocusModeToggle';
import { useFocusMode } from '../../hooks/useFocusMode';
import clsx from 'clsx';

export const AppHeader: React.FC = () => {
  const { isFocusMode, revealHeader } = useFocusMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerClassName = clsx(
    "fixed top-0 left-0 w-full bg-bg/90 backdrop-blur-md border-b border-secondary z-50 transition-all duration-500 h-16",
    {
      "opacity-0 -translate-y-full pointer-events-none": isFocusMode && !revealHeader,
      "opacity-100 translate-y-0 pointer-events-auto": !isFocusMode || revealHeader,
    }
  );

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx("hover:text-primary transition-colors font-heading text-sm font-medium h-16 flex items-center border-b-2 px-1 transition-all duration-200", {
      "text-primary border-primary": isActive,
      "text-text/70 border-transparent hover:border-primary/20": !isActive,
    });

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx("hover:text-primary transition-colors font-heading text-base font-medium py-3 border-b border-secondary", {
      "text-primary pl-2 border-l-2 border-l-primary": isActive,
      "text-text/70": !isActive,
    });

  return (
    <>
      <header className={headerClassName}>
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight text-[#0f172a]">Lumina</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            <NavLink to="/syllabus" className={getNavLinkClass}>
              Syllabus
            </NavLink>
            <NavLink to="/lessons" className={getNavLinkClass}>
              Lessons
            </NavLink>
            <NavLink to="/quizzes" className={getNavLinkClass}>
              Quizzes
            </NavLink>
            <NavLink to="/account" className={getNavLinkClass}>
              Account
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <FocusModeToggle />
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-text/70 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
          { "opacity-100 pointer-events-auto": mobileMenuOpen, "opacity-0 pointer-events-none": !mobileMenuOpen }
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={clsx(
            "absolute top-0 right-0 w-64 h-full bg-bg shadow-2xl p-6 flex flex-col gap-6 transition-transform duration-300 transform",
            { "translate-x-0": mobileMenuOpen, "translate-x-full": !mobileMenuOpen }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-secondary pb-4">
            <span className="font-heading font-semibold text-lg text-[#0f172a]">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-text/50 hover:text-primary"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex flex-col">
            <NavLink
              to="/syllabus"
              className={getMobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Syllabus
            </NavLink>
            <NavLink
              to="/lessons"
              className={getMobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Lessons
            </NavLink>
            <NavLink
              to="/quizzes"
              className={getMobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Quizzes
            </NavLink>
            <NavLink
              to="/account"
              className={getMobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Account
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};
