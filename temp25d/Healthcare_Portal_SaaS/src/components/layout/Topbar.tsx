import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { RoleSwitcher } from '../shared/RoleSwitcher';
import { Bell, Search, LogOut, Menu, User, Sparkles } from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuthStore();
  const { sidebarCollapsed } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/patients?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-surface-border bg-white px-4 md:px-6 shadow-sm">
      {/* Left side: Mobile Toggle & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border hover:bg-surface-elevated text-brand-700 transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex relative max-w-md w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient MRN, name, or phone..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface text-xs text-brand-900 border border-surface-border outline-none focus:bg-white focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/10 transition-all font-body"
          />
        </form>
      </div>

      {/* Right side: RoleSwitcher, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Notifications Icon Link */}
        <Link
          to="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border hover:bg-surface-elevated text-brand-600 hover:text-brand-900 transition-colors"
          title="Notification Hub"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </Link>

        {/* User Card */}
        {user && (
          <div className="flex items-center gap-3 border-l border-surface-border pl-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-brand-900 leading-none">
                Dr. {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-brand-600/70 font-mono font-medium capitalize mt-1">
                {role} ({user.specialty || 'General'})
              </p>
            </div>
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="h-8 w-8 rounded-full border border-surface-border"
              onError={(e) => {
                // Fallback avatar if url fails
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=ecfeff&color=0891b2`;
              }}
            />
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent hover:bg-red-50 text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
