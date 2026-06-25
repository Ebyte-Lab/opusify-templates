import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { SystemMetrics, TerminalLine, LogLevel } from '../types';
import { mockLogs } from '../data/logs';
import { registerTerminalWrite, alertTrigger } from '../utils/eventBus';

export interface TelemetryContextType {
  metrics: SystemMetrics;
  isRunning: boolean;
  lines: TerminalLine[];
  pause: () => void;
  resume: () => void;
  write: (message: string, type: LogLevel) => void;
  clear: () => void;
  execute: (command: string) => void;
}

export const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

const getTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
};

interface TelemetryProviderProps {
  children: React.ReactNode;
}

export const TelemetryProvider: React.FC<TelemetryProviderProps> = ({ children }) => {
  // Pre-seed terminal lines
  const [lines, setLines] = useState<TerminalLine[]>(() => {
    return mockLogs.slice(0, 4).map((log, index) => ({
      id: `seed-${index}`,
      type: log.type as LogLevel,
      message: log.message,
      timestamp: getTimestamp()
    }));
  });

  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 38,
    memory: 64,
    disk: 45,
    network: 145
  });

  const [isRunning, setIsRunning] = useState(true);
  
  // Refs to allow callback to always access latest values without rebuilding interval
  const isRunningRef = useRef(isRunning);
  const logIndexRef = useRef(4); // Start after seeded logs

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);

  const write = useCallback((message: string, type: LogLevel) => {
    const newLine: TerminalLine = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      message,
      timestamp: getTimestamp()
    };
    setLines((prev) => {
      const updated = [...prev, newLine];
      // Limit to 50 lines max
      if (updated.length > 50) {
        return updated.slice(updated.length - 50);
      }
      return updated;
    });
  }, []);

  // Register terminal write handler
  useEffect(() => {
    registerTerminalWrite(write);
  }, [write]);

  const clear = useCallback(() => {
    setLines([
      {
        id: `clear-${Date.now()}`,
        type: 'SYS',
        message: 'Terminal buffer memory cleared successfully.',
        timestamp: getTimestamp()
      }
    ]);
  }, []);

  const execute = useCallback((command: string) => {
    const normalized = command.trim().toLowerCase();
    write(command, 'SYS');

    // Slight delay for command response to feel like a real terminal
    setTimeout(() => {
      if (normalized === 'help') {
        write('Available commands: [ping db] [rebuild-cache] [clear] [diagnostics] [incident]', 'SYS');
      } else if (normalized === 'ping db') {
        write('Establishing database handshake... connection active.', 'INFO');
        write('PostgreSQL primary cluster ping response time: 8.4ms', 'SUCCESS');
      } else if (normalized === 'rebuild-cache') {
        write('Purging Redis session memory cache maps... done.', 'WARN');
        write('Cache indices rebuild success. Swarm node load balanced.', 'SUCCESS');
      } else if (normalized === 'clear') {
        clear();
      } else if (normalized === 'diagnostics') {
        write('Initiating deep security telemetry audit diagnostics...', 'INFO');
        write('Security scans complete. CSP policy headers validation status: OK', 'SUCCESS');
        write('Database connection limits checklist: OK (12 / 100 max connections pool)', 'SUCCESS');
      } else if (normalized === 'incident') {
        alertTrigger();
      } else {
        write(`Command error: "${command}" unrecognized. Type "help" for a list of diagnostics commands.`, 'ERROR');
      }
    }, 150);
  }, [write, clear]);

  // Telemetry Interval (3000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunningRef.current) return;

      // 1. Metric updates with drift (±3% to ±8%, clamped 0-100)
      setMetrics((prev) => {
        const drift = (min: number, max: number) => {
          const delta = Math.floor(Math.random() * (max - min + 1)) + min;
          return Math.random() > 0.5 ? delta : -delta;
        };

        const nextCpu = Math.max(10, Math.min(98, prev.cpu + drift(3, 8)));
        const nextMemory = Math.max(20, Math.min(98, prev.memory + drift(2, 6)));
        const nextDisk = Math.max(10, Math.min(98, prev.disk + drift(1, 3)));
        // Network ranges 100 - 240 Mbps
        const netDrift = Math.floor(Math.random() * 20) - 10;
        const nextNetwork = Math.max(80, Math.min(240, prev.network + netDrift));

        return {
          cpu: nextCpu,
          memory: nextMemory,
          disk: nextDisk,
          network: nextNetwork
        };
      });

      // 2. Append new log line from mock logs pool
      const nextLogIndex = logIndexRef.current;
      const logTemplate = mockLogs[nextLogIndex % mockLogs.length];
      logIndexRef.current = nextLogIndex + 1;

      write(logTemplate.message, logTemplate.type as LogLevel);
    }, 3000);

    return () => clearInterval(interval);
  }, [write]);

  return (
    <TelemetryContext.Provider value={{ metrics, isRunning, lines, pause, resume, write, clear, execute }}>
      {children}
    </TelemetryContext.Provider>
  );
};
