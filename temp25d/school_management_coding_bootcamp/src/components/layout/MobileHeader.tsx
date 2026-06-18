import React from 'react';
import { Menu, MessageSquare } from 'lucide-react';
import { useChatPanel } from '../../hooks/useChatPanel';

interface MobileHeaderProps {
  onToggleNav: () => void;
  onToggleChat: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onToggleNav, onToggleChat }) => {
  const { hasUnread } = useChatPanel();

  return (
    <header className="md:hidden bg-secondary border-b border-white/10 p-4 flex justify-between items-center z-50 shrink-0">
      <button
        onClick={onToggleNav}
        aria-label="Open Navigation Sidebar"
        className="text-text hover:text-primary transition-colors focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className="font-heading font-extrabold text-xl tracking-wider text-white select-none">
        <span className="text-primary">&lt;</span>OPUS<span className="text-primary">/&gt;</span>
      </div>
      <button
        onClick={onToggleChat}
        aria-label="Open Cohort Chat Panel"
        className="text-text hover:text-primary transition-colors focus:outline-none relative"
      >
        <MessageSquare className="w-6 h-6" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-secondary animate-pulse" />
        )}
      </button>
    </header>
  );
};
