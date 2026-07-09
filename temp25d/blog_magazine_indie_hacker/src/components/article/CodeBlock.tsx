import React, { useState, useEffect, useRef } from 'react';
import type { CodeBlock as CodeBlockType, TerminalStep } from '../../types';
import { useClipboard } from '../../hooks/useClipboard';
import { useToast } from '../../context/ToastContext';
import { TerminalConsole } from './TerminalConsole';
import { highlightCode } from '../../utils/highlighter';

interface CodeBlockProps {
  block: CodeBlockType;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ block }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<TerminalStep[]>([]);
  const copyToClipboard = useClipboard();
  const { addToast } = useToast();
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    // Clear timeouts on unmount to prevent updating state of unmounted components
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const handleRunSimulation = () => {
    if (isRunning || !block.terminalSteps) return;

    setShowConsole(true);
    setConsoleOutput([]);
    setIsRunning(true);
    timeoutsRef.current = [];

    block.terminalSteps.forEach((step) => {
      const tId = window.setTimeout(() => {
        setConsoleOutput((prev) => [...prev, step]);

        // Check if this is the last step in sequence
        if (block.terminalSteps && step === block.terminalSteps[block.terminalSteps.length - 1]) {
          setIsRunning(false);
          addToast("Execution simulation finished: STATUS_OK");
        }
      }, step.delayMs);
      timeoutsRef.current.push(tId);
    });
  };

  const handleCopy = () => {
    copyToClipboard(block.code);
  };

  return (
    <div className="bg-[#151515] border border-secondary rounded-lg overflow-hidden flex flex-col font-mono text-xs sm:text-sm my-4">
      {/* Code title bar */}
      <div className="bg-secondary/40 px-4 py-2 border-b border-secondary/50 flex items-center justify-between select-none">
        <span className="text-text/60">{block.filename}</span>
        <div className="flex gap-2">
          {block.runnable && (
            <button 
              onClick={handleRunSimulation} 
              disabled={isRunning}
              className="text-[11px] font-bold text-primary hover:text-white px-2 py-0.5 bg-primary/10 border border-primary/20 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRunning ? 'RUNNING...' : 'RUN_CODE'}
            </button>
          )}
          <button 
            onClick={handleCopy} 
            className="text-[11px] text-text/50 hover:text-white transition-colors"
          >
            COPY
          </button>
        </div>
      </div>

      {/* Snippet content */}
      <div className="p-4 overflow-x-auto select-all leading-relaxed text-text/90">
        <pre>
          <code 
            dangerouslySetInnerHTML={{ __html: highlightCode(block.code, block.language) }}
          />
        </pre>
      </div>

      {/* Integrated Execution Terminal Console */}
      <TerminalConsole steps={consoleOutput} visible={showConsole} />
    </div>
  );
};
