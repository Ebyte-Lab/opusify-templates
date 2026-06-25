import { useContext } from 'react';
import { TelemetryContext, TelemetryContextType } from '../context/TelemetryContext';

interface UseTelemetryReturn {
  metrics: TelemetryContextType['metrics'];
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
}

export const useTelemetry = (): UseTelemetryReturn => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }

  const { metrics, isRunning, pause, resume } = context;
  return { metrics, isRunning, pause, resume };
};
