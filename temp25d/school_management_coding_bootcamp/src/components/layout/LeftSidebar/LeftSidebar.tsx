import React from 'react';
import { Activity, FileText, Info, MessageSquare, Folder } from 'lucide-react';
import { UserCard } from './UserCard';
import { NavItem } from './NavItem';
import { ModuleProgressCard } from './ModuleProgressCard';

interface LeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-bg border-r border-secondary z-50 transform md:translate-x-0 md:relative transition-transform duration-300 flex flex-col shrink-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-6 hidden md:flex items-center gap-2 border-b border-secondary shrink-0">
        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 text-primary font-bold font-heading">
          O
        </div>
        <span className="font-heading font-extrabold text-xl tracking-wider text-white select-none">OPUS_CAMP</span>
      </div>

      {/* User Card */}
      <UserCard />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-[10px] uppercase tracking-widest text-text/40 font-bold mb-2 px-3 select-none">Curriculum</div>
        
        <NavItem
          to="/modules"
          icon={<Activity className="w-4 h-4" />}
          label="Modules"
          onClick={onClose}
        />
        
        <NavItem
          to="/assignments"
          icon={<FileText className="w-4 h-4" />}
          label="Assignments"
          badge={2}
          onClick={onClose}
        />
        
        <NavItem
          to="/grades"
          icon={<Info className="w-4 h-4" />}
          label="Grades"
          onClick={onClose}
        />

        <div className="text-[10px] uppercase tracking-widest text-text/40 font-bold mb-2 mt-6 px-3 select-none">Community</div>

        <NavItem
          to="/discussions"
          icon={<MessageSquare className="w-4 h-4" />}
          label="Discussions"
          onClick={onClose}
        />
        
        <NavItem
          to="/resources"
          icon={<Folder className="w-4 h-4" />}
          label="Resources"
          onClick={onClose}
        />
      </nav>

      {/* Footer Module Progress Card */}
      <ModuleProgressCard />
    </aside>
  );
};
