import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="nav-link hover:text-primary transition-colors duration-300"
    >
      {children}
    </a>
  );
}
