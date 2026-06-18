import React from 'react';
import { useUI } from '../../context/UIContext';

export const MobileOverlay = () => {
  const { isSidebarOpen, closeSidebar } = useUI();

  if (!isSidebarOpen) return null;

  return (
    <div
      id="mobile-overlay"
      className="fixed inset-0 bg-text/50 z-40 md:hidden backdrop-blur-xs transition-opacity duration-300"
      onClick={closeSidebar}
      aria-hidden="true"
    />
  );
};
