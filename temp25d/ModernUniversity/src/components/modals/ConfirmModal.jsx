import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Are you sure?', message = 'This action cannot be undone.', confirmText = 'DELETE' }) => {
  const [inputValue, setInputValue] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCloseAll = () => {
      if (isOpen) onClose();
    };
    window.addEventListener('close-all-modals', handleCloseAll);
    return () => window.removeEventListener('close-all-modals', handleCloseAll);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (inputValue === confirmText) {
      onConfirm();
      onClose();
    }
  };

  const isConfirmed = inputValue === confirmText;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-text/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 id="confirm-modal-title" className="font-heading text-2xl font-bold text-center text-text mb-2">
          {title}
        </h3>
        <p className="text-sm text-center text-muted mb-6 leading-relaxed">
          {message}
        </p>
        
        {confirmText && (
          <div className="mb-6">
            <label htmlFor="confirm-input" className="block text-xs font-semibold text-muted mb-2 text-center">
              Type <span className="text-red-600 font-bold">"{confirmText}"</span> to confirm:
            </label>
            <input
              id="confirm-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Type ${confirmText}`}
              className="w-full text-center border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              autoComplete="off"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-text font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmed}
            className={`flex-1 font-medium py-2 px-4 rounded transition-colors text-white shadow-sm focus:outline-none focus:ring-2 ${
              isConfirmed
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                : 'bg-red-300 cursor-not-allowed'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string
};
