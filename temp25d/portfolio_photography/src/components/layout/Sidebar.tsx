import React, { useState, useEffect } from 'react';
import { Instagram, Twitter } from 'lucide-react';
import { NavLink } from '../ui/NavLink';
import { navLinks } from '../../data/navLinks';

export const Sidebar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sectionIds = ['portraits', 'landscapes', 'editorial', 'about'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 fixed inset-y-0 left-0 border-r border-secondary bg-bg z-30 py-12 px-10 justify-between">
      <div>
        <a href="#" className="font-heading italic font-bold text-3xl tracking-widest text-primary block mb-16 select-none">
          Opusify.
        </a>
        
        <nav className="flex flex-col space-y-5">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.href.slice(1);
            return (
              <NavLink
                key={link.href}
                link={link}
                isActive={isLinkActive}
              />
            );
          })}
        </nav>
      </div>

      <div>
        <a
          href="#booking"
          className="inline-block border border-primary text-primary px-6 py-3 font-body text-xs tracking-widest uppercase hover:bg-primary hover:text-bg transition-colors duration-300 w-full text-center"
        >
          Booking Inquiries
        </a>
        <div className="mt-8 flex space-x-5 text-text/40 items-center">
          <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
            <Twitter size={18} strokeWidth={1.5} />
          </a>
          <a href="#" aria-label="Behance" className="hover:text-primary transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12a2 2 0 1 0 0-4H6v4h3Z" />
              <path d="M10 16a2 2 0 0 0 0-4H6v4h4Z" />
              <path d="M18 12h-4a2 2 0 0 0 4 0Z" />
              <path d="M14 8h4" />
            </svg>
          </a>
        </div>
        <p className="mt-4 text-[10px] text-text/30 tracking-wider">
          &copy; {currentYear} OPUSIFY STUDIO
        </p>
      </div>
    </aside>
  );
};
