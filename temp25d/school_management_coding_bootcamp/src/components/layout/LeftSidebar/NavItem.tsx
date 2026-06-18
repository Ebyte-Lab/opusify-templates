import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number | string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors border relative ${
          isActive
            ? 'bg-primary/10 text-primary border-primary/20 font-medium'
            : 'text-text hover:bg-secondary hover:text-white border-transparent hover:border-secondary'
        }`
      }
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && (
        <span className="absolute right-3 w-5 h-5 rounded bg-primary text-white text-[10px] flex items-center justify-center font-bold">
          {badge}
        </span>
      )}
    </NavLink>
  );
};
