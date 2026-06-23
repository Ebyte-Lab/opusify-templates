import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 transition-opacity animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Content box */}
      <div className="bg-secondary border border-slate-200 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl relative z-10 animate-[fadeIn_0.2s_ease-out]">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <span className="font-heading font-extrabold text-lg text-text">{title}</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-primary transition-colors focus:outline-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
