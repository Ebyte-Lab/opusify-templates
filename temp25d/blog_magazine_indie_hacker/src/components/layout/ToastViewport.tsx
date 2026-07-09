import React from 'react';
import { useToast } from '../../context/ToastContext';

export const ToastViewport: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div 
      id="retro-toast-frame" 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 font-heading text-xs max-w-sm pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-4 border-l-2 border-primary bg-secondary text-white rounded-lg shadow-2xl flex items-center gap-3 tracking-wider font-semibold pointer-events-auto transition-all duration-300 transform translate-y-0 opacity-100 flex-row"
          style={{
            animation: 'fadeInUp 0.25s ease-out forwards',
          }}
        >
          <div className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span>{toast.message}</span>
          <button 
            onClick={() => removeToast(toast.id)} 
            className="ml-auto pl-2 text-text/40 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};
