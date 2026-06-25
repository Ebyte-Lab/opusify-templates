import React from 'react';
import { AlertIncident } from '../../types';
import { SeverityBadge } from '../ui/SeverityBadge';
import { useTerminal } from '../../hooks/useTerminal';

interface IncidentCardProps {
  alert: AlertIncident;
  onDismiss: (id: string) => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({ alert, onDismiss }) => {
  const { id, title, text, severity, host, timestamp } = alert;
  const { write } = useTerminal();

  const handleEscalate = () => {
    write(`Incident [${title}] ESCALATED to on-call engineer (L2 support) via PagerDuty.`, 'WARN');
  };

  return (
    <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded relative overflow-hidden flex flex-col justify-between group hover:border-red-500/40 transition-colors animate-[fadeIn_0.3s_ease]">
      {/* Top row with severity badge and dismiss button */}
      <div className="flex justify-between items-start mb-2 select-none">
        <SeverityBadge severity={severity} />
        <button
          onClick={() => onDismiss(id)}
          className="text-zinc-500 hover:text-white transition-colors focus:outline-none"
          aria-label="Dismiss alert"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Title & description */}
      <h4 className="font-heading text-xs font-bold uppercase tracking-wide text-white group-hover:text-red-400 transition-colors">
        {title}
      </h4>
      <p className="font-mono text-[10px] text-zinc-500 mt-2 leading-relaxed">
        {text}
      </p>

      {/* Host metadata */}
      <div className="mt-4 pt-2 border-t border-zinc-800/40 flex justify-between items-center text-[9px] font-mono text-zinc-500">
        <span>HOST: {host}</span>
        <span>{timestamp}</span>
      </div>

      {/* Acknowledge & Escalate Buttons */}
      <div className="mt-4 flex gap-2 pt-2 border-t border-zinc-800/20">
        <button
          onClick={() => onDismiss(id)}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white py-1 px-2 rounded text-[9px] font-mono uppercase font-bold transition-all"
        >
          Acknowledge
        </button>
        <button
          onClick={handleEscalate}
          className="flex-1 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 hover:border-red-800 text-red-400 hover:text-red-300 py-1 px-2 rounded text-[9px] font-mono uppercase font-bold transition-all"
        >
          Escalate
        </button>
      </div>
    </div>
  );
};
