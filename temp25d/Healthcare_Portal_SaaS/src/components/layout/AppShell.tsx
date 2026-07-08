import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { HIPAAWarning } from '../shared/HIPAAWarning';
import { useUIStore } from '../../stores/uiStore';
import { X } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { sidebarCollapsed } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      {/* Global HIPAA compliance warning banner */}
      <HIPAAWarning />

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" />

        {/* Mobile Sidebar Modal Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="relative flex flex-col w-64 max-w-xs bg-slate-900 text-white h-full shadow-2xl z-10">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <Sidebar className="w-full relative" onCloseMobile={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
          }`}
        >
          <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
          
          <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
