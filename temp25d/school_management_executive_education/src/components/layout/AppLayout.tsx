import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { TabNav } from './TabNav';
import { Footer } from './Footer';
import { ToastViewport } from './ToastViewport';
import { useLayoutStore } from '@/hooks/useLayoutStore';
import { clsx } from 'clsx';

export const AppLayout: React.FC = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useLayoutStore();

  const mobileLinks = [
    { name: 'Overview', path: '/overview' },
    { name: 'Courses', path: '/courses' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Network', path: '/network' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Shared Sticky Header */}
      <AppHeader />

      {/* Main Desktop Horizontal Tab Navigation */}
      <TabNav />

      {/* Mobile Navigation Dropdown Menu (Slide down) */}
      <div
        className={clsx(
          'sm:hidden bg-white border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out z-25',
          mobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <ul className="flex flex-col py-2">
          {mobileLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary/5 text-primary border-l-4 border-primary'
                      : 'text-text/75 hover:bg-gray-50 border-l-4 border-transparent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast notifications */}
      <ToastViewport />
    </div>
  );
};
export default AppLayout;
