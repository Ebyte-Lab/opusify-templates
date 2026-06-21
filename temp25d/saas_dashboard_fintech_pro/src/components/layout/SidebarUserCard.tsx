import React from 'react';

export const SidebarUserCard: React.FC = () => {
  return (
    <div className="p-4 border-t border-gray-800/80 flex items-center gap-3">
      <img 
        src="https://picsum.photos/seed/trader/100/100" 
        alt="Institutional Trader Avatar" 
        className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-700"
      />
      <div className="overflow-hidden">
        <p className="text-xs font-semibold text-white tracking-wide truncate">DESK_ALPHA_TRADER</p>
        <p className="text-[10px] font-mono text-primary/80 uppercase tracking-widest">ID: 0x897f22a</p>
      </div>
    </div>
  );
};
