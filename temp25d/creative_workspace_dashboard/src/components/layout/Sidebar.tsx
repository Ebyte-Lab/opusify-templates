import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import { Progress } from '../ui/Progress';
import {
  LayoutDashboard,
  FolderGit,
  Image as ImageIcon,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { workspace } = useWorkspaceStore();

  const navGroups = [
    {
      label: 'Workspace',
      items: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/projects', label: 'Projects', icon: FolderGit },
        { to: '/assets', label: 'Assets', icon: ImageIcon },
        { to: '/team', label: 'Team', icon: Users },
      ]
    },
    {
      label: 'Tools & Comms',
      items: [
        { to: '/analytics', label: 'Analytics', icon: BarChart3 },
        { to: '/calendar', label: 'Calendar', icon: Calendar },
        { to: '/messages', label: 'Messages', icon: MessageSquare },
        { to: '/notifications', label: 'Notifications', icon: Bell },
      ]
    },
    {
      label: 'Preferences',
      items: [
        { to: '/settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside
      className={clsx(
        'hidden lg:flex flex-col bg-surface-card border-r border-surface-border transition-all duration-300 ease-in-out shrink-0 relative h-screen sticky top-0 z-30',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-surface-border/50 h-20 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-extrabold text-sm shrink-0">
          CF
        </div>
        {!sidebarCollapsed && (
          <div className="min-w-0">
            <span className="font-bold font-heading text-sm tracking-wide text-white block truncate">
              CREATIVE<span className="text-brand-400">/FLOW</span>
            </span>
            <span className="text-[9px] text-gray-500 font-semibold uppercase block truncate mt-0.5">
              {workspace?.name || 'Workspace'}
            </span>
          </div>
        )}
      </div>

      {/* Collapse Toggle Handle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3.5 top-[26px] z-40 p-1 rounded-full bg-surface-elevated border border-surface-border text-gray-400 hover:text-white hover:border-brand-500/40 transition-colors focus:outline-none"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Navigation Groups */}
      <div className="flex-grow overflow-y-auto px-4 py-6 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            {!sidebarCollapsed && (
              <span className="block px-3 text-[9px] font-bold uppercase tracking-wider text-gray-600">
                {group.label}
              </span>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150',
                      isActive
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/15 shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-surface-elevated/40 border border-transparent'
                    )
                  }
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Workspace Usage widget */}
      {!sidebarCollapsed && (
        <div className="p-4 m-4 bg-surface-elevated/35 border border-surface-border/40 rounded-xl space-y-3 shrink-0">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
            <span className="text-gray-500">Workspace Storage</span>
            <span className="text-brand-400">82%</span>
          </div>
          <Progress value={82} color="bg-brand-500" />
          <p className="text-[9px] text-gray-500 leading-normal font-semibold uppercase">
            8.2 GB of 10 GB active.
          </p>
        </div>
      )}
    </aside>
  );
};
