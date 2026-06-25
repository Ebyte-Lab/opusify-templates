import { useContext } from 'react';
import { AlertsContext, AlertsContextType } from '../context/AlertsContext';

interface UseAlertsReturn {
  alerts: AlertsContextType['alerts'];
  activeCount: number;
  trigger: (presetIndex?: number) => void;
  dismiss: (id: string) => void;
}

export const useAlerts = (): UseAlertsReturn => {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }

  const { alerts, activeCount, trigger, dismiss } = context;
  return { alerts, activeCount, trigger, dismiss };
};
