import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Menu, X, User, CreditCard, LogOut } from 'lucide-react';
import { useLayoutStore } from '@/hooks/useLayoutStore';
import { useToast } from '@/hooks/useToast';
import { useProfileStore } from '@/hooks/useProfileStore';

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { mobileMenuOpen, setMobileMenuOpen, unreadCount, setUnreadCount } = useLayoutStore();
  const profile = useProfileStore((state) => state.profile);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    if (unreadCount > 0) {
      setUnreadCount(0);
      addToast('Marked all notifications as read', 'success');
    } else {
      setUnreadCount(3);
      addToast('Reset mock notifications', 'success');
    }
  };

  const handleLogout = () => {
    addToast('Successfully logged out (Mock)', 'success');
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and branding */}
        <Link to="/overview" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-heading font-bold text-lg rounded-sm shadow-sm transition-transform group-hover:scale-105">
            O
          </div>
          <span className="font-heading font-bold text-lg tracking-wide text-text uppercase">
            Executive Institute
          </span>
        </Link>

        {/* Header Actions */}
        <div className="flex items-center gap-6">
          {/* Notification Bell */}
          <button
            onClick={handleNotificationClick}
            aria-label="Toggle notifications"
            className="text-text/60 hover:text-primary transition-colors relative p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-pulse" />
            )}
          </button>

          <div className="h-6 w-px bg-gray-200" />

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              className="flex items-center gap-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary p-1 rounded-sm"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-text group-hover:text-primary transition-colors">
                  {profile.name}
                </div>
                <div className="text-xs text-text/60">
                  {profile.cohort}
                </div>
              </div>
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} Profile`}
                className="w-9 h-9 rounded-sm object-cover border border-gray-200"
              />
              <ChevronDown
                size={16}
                className={`text-text/40 hidden sm:block transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-sm shadow-lg py-1 z-50 focus:outline-none animate-fadeIn"
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    navigate('/profile');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-text/80 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <User size={14} />
                  <span>My Profile</span>
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    navigate('/profile');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-text/80 hover:bg-gray-50 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <CreditCard size={14} />
                  <span>Billing Summary</span>
                </button>
                <div className="h-px bg-gray-150 my-1" />
                <button
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="sm:hidden text-text/60 hover:text-primary p-1 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
