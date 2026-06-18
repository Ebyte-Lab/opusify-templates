import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export const AdvisorMeetingModal = ({ isOpen, onClose, onConfirm, advisorName = 'Prof. Michael Holt' }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const modalRef = useRef(null);

  const timeSlots = [
    { id: 1, date: 'Monday, Nov 10', time: '10:00 AM – 10:30 AM', location: 'Science Bldg, Rm 318' },
    { id: 2, date: 'Wednesday, Nov 12', time: '2:00 PM – 2:30 PM', location: 'Science Bldg, Rm 318' },
    { id: 3, date: 'Friday, Nov 14', time: '11:00 AM – 11:30 AM', location: 'Science Bldg, Rm 318' }
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedSlot(null);
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
    if (selectedSlot) {
      onConfirm(selectedSlot);
      onClose();
    }
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
        aria-labelledby="advisor-modal-title"
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 id="advisor-modal-title" className="font-heading text-2xl font-bold text-center text-text mb-1">
          Schedule with Advisor
        </h3>
        <p className="text-sm text-center text-muted mb-6">
          Choose a slot to meet with {advisorName}.
        </p>

        <div className="space-y-3 mb-6">
          <span className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">Available Slots</span>
          {timeSlots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            return (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`w-full text-left p-3.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isSelected
                    ? 'border-primary bg-secondary/30 ring-2 ring-primary'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-text text-sm">{slot.date}</span>
                  {isSelected && (
                    <span className="text-primary text-xs font-bold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted font-medium">{slot.time} · {slot.location}</p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-text font-medium py-2 px-4 rounded transition-colors focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedSlot}
            className={`flex-1 font-medium py-2 px-4 rounded transition-colors text-white shadow-sm ${
              selectedSlot
                ? 'bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

AdvisorMeetingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  advisorName: PropTypes.string
};
