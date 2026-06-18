import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSidebarDrawers } from '../../hooks/useSidebarDrawers';
import { ChatPanelProvider } from '../../app/providers/ChatPanelProvider';
import { MobileHeader } from './MobileHeader';
import { LeftSidebar } from './LeftSidebar/LeftSidebar';
import { CohortChatPanel } from './RightSidebar/CohortChatPanel';
import { SidebarOverlay } from './SidebarOverlay';

export const AppShell: React.FC = () => {
  const { leftOpen, rightOpen, openLeft, openRight, closeAll } = useSidebarDrawers();

  const isAnyDrawerOpen = leftOpen || rightOpen;

  return (
    <ChatPanelProvider>
      <div className="selection:bg-primary/30 selection:text-primary overflow-hidden h-screen w-screen flex flex-col md:flex-row bg-bg text-text">
        {/* Mobile Header */}
        <MobileHeader onToggleNav={openLeft} onToggleChat={openRight} />

        {/* Sidebar Backdrop Overlay on Mobile */}
        <SidebarOverlay isOpen={isAnyDrawerOpen} onClick={closeAll} />

        {/* Left Navigation Sidebar */}
        <LeftSidebar isOpen={leftOpen} onClose={closeAll} />

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto bg-[#09090B] h-full relative min-w-0">
          <Outlet />
        </main>

        {/* Right Cohort Chat Panel */}
        <CohortChatPanel isOpen={rightOpen} />
      </div>
    </ChatPanelProvider>
  );
};
