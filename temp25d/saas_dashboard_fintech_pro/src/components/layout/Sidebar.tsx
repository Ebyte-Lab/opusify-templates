import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  FileText, 
  Settings as SettingsIcon,
  DollarSign
} from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { SidebarUserCard } from './SidebarUserCard';
import clsx from 'clsx';

export const Sidebar: React.FC = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
    { to: '/portfolios', label: 'Portfolios', icon: PieChart },
    { to: '/reports', label: 'Reports', icon: FileText },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 w-64 bg-secondary/95 border-r border-gray-800/80 z-40 flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-gray-800/80">
          <div className="w-6 h-6 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center">
            <DollarSign className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
          </div>
          <span className="font-bold tracking-tight font-mono text-white">
            FINTECH<span className="text-primary">_PRO</span>
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex-grow py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text/60 hover:text-white hover:bg-gray-800/50"
                  )
                }
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Card */}
        <SidebarUserCard />
      </aside>
    </>
  );
};
