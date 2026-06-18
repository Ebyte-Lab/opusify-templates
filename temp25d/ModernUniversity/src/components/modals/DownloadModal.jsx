import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const DownloadModal = ({ isOpen, onClose, title = 'Download Prepared', message = 'Your file has been prepared securely.', onSave = null }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
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

  const handleSave = () => {
    if (onSave) onSave();
    onClose();
  };

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
        aria-labelledby="download-modal-title"
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 id="download-modal-title" className="font-heading text-2xl font-bold text-center text-text mb-2">
          {title}
        </h3>
        <p className="text-sm text-center text-muted mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-blue-900 text-white font-medium py-2 px-4 rounded transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Save to Device
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-text font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DownloadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onSave: PropTypes.func
};
