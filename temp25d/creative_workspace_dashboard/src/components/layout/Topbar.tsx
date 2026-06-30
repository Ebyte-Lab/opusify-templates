import React from 'react';
import { useUserStore } from '../../stores/userStore';
import { useUIStore } from '../../stores/uiStore';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import { Avatar } from '../ui/Avatar';
import { LogOut, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from '../ui/Dropdown';

export const Topbar: React.FC = () => {
  const { user, logout } = useUserStore();
  const { collabSimulationActive, toggleCollabSimulation } = useUIStore();
  const { workspace } = useWorkspaceStore();
  const location = useLocation();

  const getPageTitle = (path: string) => {
    if (path.startsWith('/projects/')) {
      if (path.endsWith('/new')) return 'Create Project';
      return 'Project Canvas';
    }
    switch (path) {
      case '/dashboard':
        return 'Dashboard Spec';
      case '/projects':
        return 'Project Canvas';
      case '/assets':
        return 'Asset Library';
      case '/team':
        return 'Team Directory';
      case '/analytics':
        return 'Performance Insights';
      case '/calendar':
        return 'Team Calendar';
      case '/messages':
        return 'Team Discussions';
      case '/notifications':
        return 'Inbox Notifications';
      case '/settings':
        return 'Settings Workspace';
      default:
        return 'Creative Space';
    }
  };

  const userDropdownItems = [
    {
      label: 'View Profile',
      onClick: () => {}
    },
    {
      label: 'Logout Session',
      icon: <LogOut className="w-3.5 h-3.5 text-accent-rose" />,
      onClick: () => logout(),
      variant: 'danger' as const
    }
  ];

  return (
    <header className="sticky top-0 bg-surface/95 backdrop-blur-md px-8 py-5 border-b border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 z-20 h-auto sm:h-20 shrink-0">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div>
          <h1 className="text-base font-bold font-heading leading-tight text-white">
            {getPageTitle(location.pathname)}
          </h1>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
            {workspace?.name || 'Workspace'} / Fluid Design System
          </p>
        </div>
      </div>
      
      {/* Real-time Interaction Controls */}
      <div className="flex items-center gap-3.5 w-full sm:w-auto justify-end">
        {/* Collaboration Simulation Button */}
        <button
          onClick={toggleCollabSimulation}
          className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm active:scale-95 ${
            collabSimulationActive
              ? 'bg-accent-teal/10 border-accent-teal/35 text-accent-teal'
              : 'bg-surface-elevated/45 border-surface-border text-gray-400 hover:border-brand-500/30 hover:text-white'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${
              collabSimulationActive ? 'bg-accent-teal animate-ping' : 'bg-gray-600'
            }`}
          />
          <span>Simulate Team Collaboration</span>
        </button>

        <div className="h-6 w-px bg-surface-border hidden sm:block" />

        {/* Co-workers Presence Avatars */}
        <div className="flex -space-x-2 shrink-0">
          <Avatar
            name="Sarah Jenkins"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80"
            size="sm"
            className="ring-2 ring-surface"
          />
          <Avatar
            name="Devon King"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80"
            size="sm"
            className="ring-2 ring-surface"
          />
          <div className="w-6 h-6 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-[8px] text-brand-400 font-bold ring-2 ring-surface">
            +2
          </div>
        </div>

        <div className="h-6 w-px bg-surface-border" />

        {/* Notifications Icon shortcut */}
        <Link
          to="/notifications"
          className="p-2 rounded-xl bg-surface-elevated/45 border border-surface-border text-gray-400 hover:text-white hover:border-brand-500/30 transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-500" />
        </Link>

        {/* User Dropdown */}
        {user && (
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 text-left focus:outline-none">
                <Avatar name={user.name} src={user.avatarUrl} size="md" className="cursor-pointer hover:opacity-90 transition-opacity" />
              </button>
            }
            items={userDropdownItems}
          />
        )}
      </div>
    </header>
  );
};
