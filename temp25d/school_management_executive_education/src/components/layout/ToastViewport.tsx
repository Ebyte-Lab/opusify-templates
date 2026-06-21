import React, { useEffect, useState } from 'react';
import { useToastStore, ToastItem } from '@/hooks/useToast';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { clsx } from 'clsx';

export const ToastViewport: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation slightly before removal
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2700);

    const removeTimer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, onDismiss]);

  const handleManualDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 250);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="text-green-400 shrink-0" size={18} />;
      case 'error':
        return <XCircle className="text-red-400 shrink-0" size={18} />;
      default:
        return <Info className="text-blue-400 shrink-0" size={18} />;
    }
  };

  return (
    <div
      className={clsx(
        'bg-text text-white px-4 py-3 rounded-sm shadow-xl flex items-center justify-between gap-3 text-sm font-semibold border-l-4 pointer-events-auto transition-all',
        toast.type === 'success' && 'border-green-500',
        toast.type === 'error' && 'border-red-500',
        toast.type === 'info' && 'border-primary',
        isExiting ? 'toast-exit' : 'toast-enter'
      )}
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <span>{toast.message}</span>
      </div>
      <button
        onClick={handleManualDismiss}
        className="text-white/40 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white p-0.5 rounded-sm"
        aria-label="Dismiss toast"
      >
        <X size={14} />
      </button>
    </div>
  );
};
