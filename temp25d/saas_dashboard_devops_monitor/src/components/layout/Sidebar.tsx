import React from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../constants/navigation';
import { useAlerts } from '../../hooks/useAlerts';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeCount } = useAlerts();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity" 
        />
      )}

      {/* Sidebar Navigation Panel */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static flex flex-col w-64 bg-secondary/80 border-r border-zinc-800 transition-transform duration-300 ease-in-out shrink-0 select-none`}
      >
        {/* Logo Branding Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-zinc-800/80">
          <div className="w-5 h-5 rounded-sm bg-primary/10 border border-primary/45 flex items-center justify-center text-primary font-bold text-xs">
            O
          </div>
          <span className="font-bold tracking-wider font-heading text-sm text-white">
            OPUS<span className="text-primary">/MONITOR</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose} // Closes drawer on link select on mobile
              className={({ isActive }) => {
                const base = "group flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold transition-all ";
                return isActive
                  ? base + "bg-primary/10 text-primary border border-primary/20"
                  : base + "text-zinc-500 hover:text-white hover:bg-zinc-800/50 border border-transparent";
              }}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.alertBadge && activeCount > 0 ? (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_#EF4444]"></span>
                    </span>
                  ) : (
                    isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                    )
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Swarm Details Footer */}
        <div className="p-4 border-t border-zinc-800/80 font-mono text-[10px] space-y-1 text-zinc-500">
          <p>
            SWARM_STATUS:{' '}
            {activeCount > 0 ? (
              <span className="text-red-500 font-bold animate-pulse">DEGRADED</span>
            ) : (
              <span className="text-emerald-500 font-bold">NOMINAL</span>
            )}
          </p>
          <p>REG_ZONE: us-east-2</p>
          <p>AGENT_VERSION: v1.8.44-b</p>
        </div>
      </aside>
    </>
  );
};
