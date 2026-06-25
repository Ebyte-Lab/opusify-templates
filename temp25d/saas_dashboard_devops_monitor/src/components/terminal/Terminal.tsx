import React, { useEffect, useRef } from 'react';
import { TerminalLine as ITerminalLine } from '../../types';
import { TerminalLine } from './TerminalLine';
import { CliInput } from './CliInput';

interface TerminalProps {
  lines: ITerminalLine[];
  onExecute: (command: string) => void;
  onPause: () => void;
  onResume: () => void;
  onClear: () => void;
  isRunning: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  onExecute,
  onPause,
  onResume,
  onClear,
  isRunning
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new output entries
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="bg-[var(--terminal-bg)] border border-[var(--border)] rounded overflow-hidden flex flex-col relative scanline">
      {/* Console Titlebar */}
      <div className="bg-secondary px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="hidden sm:inline">SYSTEM_TELEMETRY_SHELL &mdash; bash (64-bit)</span>
          <span className="sm:hidden text-primary font-bold">TELEMETRY</span>
        </div>
        <div className="flex items-center gap-3 font-sans">
          <button
            onClick={onClear}
            className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-wider font-semibold"
          >
            Clear Screen
          </button>
          <button
            onClick={isRunning ? onPause : onResume}
            className={`text-[10px] uppercase tracking-wider font-semibold transition-colors ${
              isRunning ? 'text-zinc-500 hover:text-primary' : 'text-primary hover:text-white font-bold'
            }`}
          >
            {isRunning ? 'Pause Telemetry' : 'Resume Telemetry'}
          </button>
        </div>
      </div>

      {/* Terminal Output screen */}
      <div
        ref={bodyRef}
        className="p-4 h-80 overflow-y-auto font-mono text-xs text-zinc-300 space-y-1.5 flex flex-col bg-black min-h-[250px]"
      >
        <div className="flex-grow flex flex-col justify-end gap-1.5">
          {lines.map((line) => (
            <TerminalLine key={line.id} line={line} />
          ))}
        </div>
      </div>

      {/* CLI Input Prompt */}
      <CliInput onExecute={onExecute} />
    </div>
  );
};
