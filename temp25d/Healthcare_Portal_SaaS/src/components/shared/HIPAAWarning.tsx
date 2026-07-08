import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const HIPAAWarning: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-amber-800 text-xs flex items-center justify-between font-medium">
      <div className="flex items-center gap-2">
        <ShieldAlert size={14} className="text-amber-600 animate-pulse" />
        <span>
          <strong>HIPAA Sandbox Mode:</strong> This system is configured with fictional data only. Do not input real Patient Health Information (PHI).
        </span>
      </div>
      <div className="hidden sm:block text-[10px] text-amber-600/80 tracking-wide font-mono uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25">
        Non-Production
      </div>
    </div>
  );
};
