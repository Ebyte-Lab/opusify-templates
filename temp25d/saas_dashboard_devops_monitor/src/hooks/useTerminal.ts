import { useContext } from 'react';
import { TelemetryContext, TelemetryContextType } from '../context/TelemetryContext';
import { LogLevel } from '../types';

interface UseTerminalReturn {
  lines: TelemetryContextType['lines'];
  write: (message: string, type: LogLevel) => void;
  clear: () => void;
  execute: (command: string) => void;
}

export const useTerminal = (): UseTerminalReturn => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TelemetryProvider');
  }

  const { lines, write, clear, execute } = context;
  return { lines, write, clear, execute };
};
