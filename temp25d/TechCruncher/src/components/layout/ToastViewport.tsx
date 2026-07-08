import React from 'react';
import { Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ToastViewport: React.FC = () => {
  const { toasts, remove } = useToast();

  return (
    <div
      id="cruncher-toast-wrapper"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => remove(toast.id)}
          className="p-4 border-l-4 border-primary bg-secondary text-text rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold leading-normal cursor-pointer transition-all duration-300 transform translate-y-0 opacity-100 border-green-500 animate-[fadeIn_0.2s_ease_forwards] pointer-events-auto"
          role="alert"
        >
          <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="flex-grow">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
export default ToastViewport;
