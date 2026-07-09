import React from 'react';
import { useToast } from '../../context/ToastContext';

export const ToastViewport: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-4 border-l-2 border-primary bg-bg text-text rounded-lg shadow-2xl flex items-center gap-3 text-xs tracking-wider font-semibold font-heading leading-normal pointer-events-auto animate-fade-in transition-all duration-300"
        >
          <div className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
