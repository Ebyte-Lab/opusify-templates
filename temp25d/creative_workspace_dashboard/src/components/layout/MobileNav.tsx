import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderGit, Folder, MessageSquare, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export const MobileNav: React.FC = () => {
  const navItems = [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/projects', label: 'Projects', icon: FolderGit },
    { to: '/assets', label: 'Assets', icon: Folder },
    { to: '/messages', label: 'Chat', icon: MessageSquare },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="lg:hidden fixed bottom-4 left-4 right-4 bg-surface-card/90 backdrop-blur-lg border border-surface-border rounded-2xl px-4 py-2 flex items-center justify-around z-40 shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 active:scale-95',
                isActive
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-gray-500 hover:text-gray-300'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={clsx('w-5 h-5', isActive && 'stroke-[2.5px]')} />
                <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
