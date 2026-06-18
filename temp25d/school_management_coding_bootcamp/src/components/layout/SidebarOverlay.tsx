import React from 'react';

interface SidebarOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isOpen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    />
  );
};
