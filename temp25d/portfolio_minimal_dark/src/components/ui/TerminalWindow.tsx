// src/components/ui/TerminalWindow.tsx
import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'guest@local: ~',
  children,
}) => {
  return (
    <div className="rounded-lg overflow-hidden border border-secondary shadow-[0_0_20px_rgba(0,255,65,0.05)] bg-[#0A0A0A] w-full">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 bg-secondary/30 border-b border-secondary select-none">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-text/50 font-heading">{title}</div>
      </div>
      {/* Terminal Body */}
      <div className="p-6 sm:p-8 space-y-4 text-sm sm:text-base font-body">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
