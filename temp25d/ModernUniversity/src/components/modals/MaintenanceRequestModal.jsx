import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const MaintenanceRequestModal = ({ isOpen, onClose, onSubmit, defaultRoom = 'Maple Hall, Room 214B' }) => {
  const [room, setRoom] = useState(defaultRoom);
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setRoom(defaultRoom);
      setIssueType('');
      setDescription('');
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }
  }, [isOpen, defaultRoom]);

  useEffect(() => {
    const handleCloseAll = () => {
      if (isOpen) onClose();
    };
    window.addEventListener('close-all-modals', handleCloseAll);
    return () => window.removeEventListener('close-all-modals', handleCloseAll);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issueType && description) {
      onSubmit({ room, issueType, description });
      onClose();
    }
  };

  const isFormValid = issueType !== '' && description.trim() !== '';

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
        aria-labelledby="maintenance-modal-title"
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 id="maintenance-modal-title" className="font-heading text-2xl font-bold text-center text-text mb-1">
          Maintenance Request
        </h3>
        <p className="text-sm text-center text-muted mb-6">
          Submit an issue report for your residence hall room.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="maintenance-room" className="block text-xs font-semibold text-muted mb-1.5">
              Room / Location
            </label>
            <input
              id="maintenance-room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 text-text font-medium"
              required
            />
          </div>

          <div>
            <label htmlFor="maintenance-type" className="block text-xs font-semibold text-muted mb-1.5">
              Issue Category
            </label>
            <select
              id="maintenance-type"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text"
              required
            >
              <option value="" disabled>Select an issue category</option>
              <option value="Plumbing">Plumbing (Leak, Clogged Drain, etc.)</option>
              <option value="Electrical">Electrical (Outlet, Light Fixture, etc.)</option>
              <option value="Heating/AC">Heating & Air Conditioning</option>
              <option value="Furniture">Furniture Repair / Replacement</option>
              <option value="Lock/Key">Lock, Key, or Access Card issue</option>
              <option value="Other">Other Maintenance Issue</option>
            </select>
          </div>

          <div>
            <label htmlFor="maintenance-desc" className="block text-xs font-semibold text-muted mb-1.5">
              Issue Description
            </label>
            <textarea
              id="maintenance-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail (e.g. desk light flickering, water leaking under sink)"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-text font-medium py-2 px-4 rounded transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 font-medium py-2 px-4 rounded transition-colors text-white shadow-sm ${
                isFormValid
                  ? 'bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MaintenanceRequestModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultRoom: PropTypes.string
};
