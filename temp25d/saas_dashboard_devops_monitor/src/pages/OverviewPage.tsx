import React, { useState, useEffect } from 'react';
import { SystemGaugeGrid } from '../components/gauges/SystemGaugeGrid';
import { Terminal } from '../components/terminal/Terminal';
import { IncidentStack } from '../components/incidents/IncidentStack';
import { useTerminal } from '../hooks/useTerminal';
import { useTelemetry } from '../hooks/useTelemetry';

export const OverviewPage: React.FC = () => {
  const { lines, execute, clear } = useTerminal();
  const { isRunning, pause, resume } = useTelemetry();
  const [timestamp, setTimestamp] = useState('');

  // Live timestamp sub-header
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toLocaleDateString() + ' @ ' + now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-heading font-extrabold uppercase tracking-tight text-white select-none">
          System Overview
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono mt-0.5 select-none">
          &gt;_ Live telemetry check: <span className="text-primary font-bold">{timestamp}</span>
        </p>
      </div>

      {/* Grid container: 2/3 and 1/3 columns */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Column (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Resource Gauges */}
          <SystemGaugeGrid />

          {/* Quick Action Terminal Buttons */}
          <div className="flex flex-wrap gap-2 items-center select-none">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mr-1">
              Quick CLI:
            </span>
            <button
              onClick={() => execute('ping db')}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-3 py-1.5 rounded text-[9px] uppercase font-bold tracking-wider font-mono transition-all"
            >
              ping db
            </button>
            <button
              onClick={() => execute('rebuild-cache')}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-3 py-1.5 rounded text-[9px] uppercase font-bold tracking-wider font-mono transition-all"
            >
              rebuild-cache
            </button>
            <button
              onClick={() => execute('diagnostics')}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-3 py-1.5 rounded text-[9px] uppercase font-bold tracking-wider font-mono transition-all"
            >
              diagnostics
            </button>
            <button
              onClick={() => execute('incident')}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white px-3 py-1.5 rounded text-[9px] uppercase font-bold tracking-wider font-mono transition-all"
            >
              incident
            </button>
          </div>

          {/* Terminal Emulator */}
          <Terminal
            lines={lines}
            onExecute={execute}
            onPause={pause}
            onResume={resume}
            onClear={clear}
            isRunning={isRunning}
          />
        </div>

        {/* Right Column (1/3) */}
        <div className="xl:col-span-1">
          <IncidentStack gridClass="space-y-3" />
        </div>
      </div>
    </div>
  );
};
