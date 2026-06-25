import React, { useState, useEffect } from 'react';
import { useAlerts } from '../../hooks/useAlerts';

export const TopBar: React.FC = () => {
  const { activeCount, trigger } = useAlerts();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 bg-bg/95 backdrop-blur-md px-6 h-16 border-b border-zinc-800/80 flex items-center justify-between z-20 select-none">
      {/* Left side info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${activeCount > 0 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'} shadow-[0_0_8px_#22C55E]`}></span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-white">Zone 01 Cluster</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
          <span>Active Containers: <b className="text-white font-mono">148</b></span>
        </div>
      </div>
      
      {/* Center live clock & global alert badge */}
      <div className="flex items-center gap-3 font-mono text-[10px]">
        <span className="text-zinc-500">TIME: <b className="text-white font-mono">{time || '--:--:--'}</b></span>
        {activeCount > 0 && (
          <span className="px-2 py-0.5 rounded font-bold border border-red-800/50 bg-red-950/40 text-red-500 animate-pulse">
            {activeCount} ALERTS ACTIVE
          </span>
        )}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => trigger()} 
          className="flex items-center gap-1.5 bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-800/40 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded font-semibold transition-all"
        >
          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse inline-block"></span>
          Simulate Outage
        </button>
        <div className="h-6 w-px bg-zinc-800"></div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
          <span>AGENT_PING: <b className="text-emerald-500 font-bold">14ms</b></span>
        </div>
      </div>
    </div>
  );
};
