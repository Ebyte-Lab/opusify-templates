import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  FlaskConical,
  Pill,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  HeartPulse,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onCloseMobile }) => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { role } = useAuthStore();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { to: '/patients', label: 'Patients', icon: Users, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { to: '/appointments', label: 'Appointments', icon: Calendar, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { to: '/doctors', label: 'Providers', icon: Stethoscope, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { to: '/lab', label: 'Lab Orders', icon: FlaskConical, roles: ['admin', 'doctor', 'nurse'] },
    { to: '/prescriptions', label: 'Prescriptions', icon: Pill, roles: ['admin', 'doctor', 'nurse'] },
    { to: '/billing', label: 'Billing & Invoices', icon: CreditCard, roles: ['admin', 'receptionist'] },
    { to: '/messages', label: 'Secure Chat', icon: MessageSquare, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { to: '/reports', label: 'Analytics & Reports', icon: BarChart3, roles: ['admin', 'doctor'] },
    { to: '/settings', label: 'Settings Console', icon: Settings, roles: ['admin'] },
  ];

  // Filter based on active role permissions
  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 text-white transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } ${className}`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 glow-brand">
            <HeartPulse size={22} className="stroke-[2.5]" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-display font-bold text-base tracking-tight text-white whitespace-nowrap">
              NEXUS<span className="text-cyan-400 font-semibold">_PORTAL</span>
            </span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="hidden md:flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto no-scrollbar">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/10'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/20 text-center">
          <p className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
            Platform v2.4.1
          </p>
        </div>
      )}
    </aside>
  );
};
