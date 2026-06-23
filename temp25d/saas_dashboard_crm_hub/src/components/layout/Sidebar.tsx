import React from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../../constants/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const activeClass = 'sidebar-item group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold bg-primary/10 text-primary transition-all';
  const inactiveClass = 'sidebar-item group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-text hover:bg-slate-50 transition-all';

  return (
    <>
      {/* Sidebar Backdrop on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-30 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Aside Panel */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static flex flex-col w-64 bg-secondary border-r border-slate-200 z-40 transition-transform duration-300 ease-in-out shrink-0`}
      >
        {/* Logo Header */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="font-bold tracking-tight font-heading text-xl text-text">
            CRM<span className="text-primary">_HUB</span>
          </span>
        </div>

        {/* Sidebar Navigation List */}
        <nav className="flex-grow py-6 px-4 space-y-1 overflow-y-auto">
          {navigationItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={onClose}
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile Info Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center gap-3">
          <img
            src="https://picsum.photos/seed/crmtrader/100/100"
            alt="Sarah Jenkins"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/40 shrink-0"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-text truncate">Sarah Jenkins</p>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
              Sales Coordinator
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
