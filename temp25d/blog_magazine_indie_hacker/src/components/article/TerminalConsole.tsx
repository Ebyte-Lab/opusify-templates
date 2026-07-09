import React, { useEffect, useRef } from 'react';
import type { TerminalStep } from '../../types';

interface TerminalConsoleProps {
  steps: TerminalStep[];
  visible: boolean;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ steps, visible }) => {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [steps, visible]);

  if (!visible) return null;

  return (
    <div 
      ref={consoleRef}
      id="term-console" 
      className="border-t border-secondary/50 bg-[#0C0C0C] p-4 max-h-60 overflow-y-auto"
    >
      <div className="flex items-center gap-2 text-text/40 text-[10px] uppercase font-bold border-b border-secondary/30 pb-1.5 mb-2 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
        console output
      </div>
      <div id="term-output" className="text-text/60 font-mono text-xs space-y-1">
        {steps.map((step, idx) => {
          let toneClass = 'text-text/70';
          if (step.tone === 'success') {
            toneClass = 'text-emerald-400 font-bold';
          } else if (step.tone === 'muted') {
            toneClass = 'text-text/40';
          }
          return (
            <div key={idx} className={toneClass}>
              {step.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
