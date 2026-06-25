import React from 'react';
import { useAlerts } from '../../hooks/useAlerts';
import { IncidentCard } from './IncidentCard';

interface IncidentStackProps {
  gridClass?: string;
}

export const IncidentStack: React.FC<IncidentStackProps> = ({ gridClass = 'space-y-3' }) => {
  const { alerts, activeCount, trigger, dismiss } = useAlerts();

  return (
    <div className="space-y-4">
      {/* Header and counter badge */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 select-none">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
            Active Incident Stack
          </h3>
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold transition-all ${
              activeCount > 0
                ? 'bg-red-950 text-red-500 border border-red-800/50 shadow-[0_0_8px_#EF4444]'
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
            }`}
          >
            {activeCount} ALERTS
          </span>
        </div>
        <button
          onClick={() => trigger()}
          className="bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-800/40 text-[9px] uppercase tracking-wider px-2 py-1 rounded font-semibold transition-all"
        >
          + Trigger Incident
        </button>
      </div>

      {/* Alert Card Stack / Grid */}
      {activeCount > 0 ? (
        <div className={gridClass}>
          {alerts.map((alert) => (
            <IncidentCard key={alert.id} alert={alert} onDismiss={dismiss} />
          ))}
        </div>
      ) : (
        /* Empty Placeholder State */
        <div className="h-64 border border-zinc-800/80 border-dashed rounded flex flex-col items-center justify-center text-center p-6 text-zinc-500 font-mono text-xs select-none">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-emerald-500 mb-2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>NO_ACTIVE_INCIDENTS</span>
          <span className="text-[10px] text-zinc-600 mt-1">
            Swarm is operating smoothly.
          </span>
        </div>
      )}
    </div>
  );
};
