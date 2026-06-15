import React from 'react';
import type { NavLink as NavLinkType } from '../../types';

interface NavLinkProps {
  link: NavLinkType;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ link, isActive = false, onClick }) => {
  if (link.variant === 'accent') {
    return (
      <a
        href={link.href}
        onClick={onClick}
        className="font-heading italic font-semibold text-primary hover:text-primary/70 transition-colors"
      >
        {link.label}
      </a>
    );
  }

  return (
    <a
      href={link.href}
      onClick={onClick}
      className={`font-body text-sm tracking-widest uppercase transition-colors flex items-center group cursor-pointer ${
        isActive ? 'text-primary font-semibold' : 'text-text/60 hover:text-primary'
      }`}
    >
      <span className={`h-px bg-primary transition-all duration-300 ${
        isActive ? 'w-4 mr-3' : 'w-0 mr-0 group-hover:w-4 group-hover:mr-3'
      }`}></span>
      {link.label}
    </a>
  );
};
