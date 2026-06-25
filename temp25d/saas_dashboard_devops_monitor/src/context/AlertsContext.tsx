import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { AlertIncident } from '../types';
import { alertPresets } from '../data/alerts';
import { registerAlertTrigger, terminalWrite } from '../utils/eventBus';

export interface AlertsContextType {
  alerts: AlertIncident[];
  activeCount: number;
  trigger: (presetIndex?: number) => void;
  dismiss: (id: string) => void;
}

export const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertIncident[]>([]);
  const cycleIndexRef = useRef(0);

  const trigger = useCallback((presetIndex?: number) => {
    const idx = presetIndex !== undefined ? presetIndex : cycleIndexRef.current % alertPresets.length;
    const preset = alertPresets[idx];
    
    const newAlert: AlertIncident = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: preset.title,
      text: preset.text,
      severity: preset.severity,
      host: preset.host,
      timestamp: new Date().toTimeString().split(' ')[0],
      dismissed: false
    };

    setAlerts((prev) => [newAlert, ...prev]);
    
    // Log to terminal
    terminalWrite(`Alert Incident registered in stack: ${preset.title}`, 'ERROR');

    if (presetIndex === undefined) {
      cycleIndexRef.current += 1;
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setAlerts((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target) {
        terminalWrite(`Active diagnostic incident manually acknowledged and resolved: ${target.title}`, 'SUCCESS');
      }
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  // Register trigger function globally
  useEffect(() => {
    registerAlertTrigger(trigger);
  }, [trigger]);

  const activeCount = alerts.filter(a => !a.dismissed).length;

  return (
    <AlertsContext.Provider value={{ alerts, activeCount, trigger, dismiss }}>
      {children}
    </AlertsContext.Provider>
  );
};
