import React from 'react';

interface NeonPanelProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

export const NeonPanel: React.FC<NeonPanelProps> = ({
  children,
  className = '',
  active = false,
}) => {
  return (
    <div
      className={`neon-border bg-bg group flex flex-col h-full relative overflow-hidden ${
        active ? 'neon-active' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
