import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface LightboxProps {
  isOpen: boolean;
  currentSrc: string | null;
  currentAlt: string | null;
  isLoading: boolean;
  onClose: () => void;
  onImageLoad: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentSrc,
  currentAlt,
  isLoading,
  onClose,
  onImageLoad,
  onNext,
  onPrev,
}) => {
  useBodyScrollLock(isOpen);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !currentSrc) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      ref={containerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 outline-none"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-6 right-6 md:top-10 md:right-10 text-primary p-2 hover:opacity-50 transition-opacity z-50 cursor-pointer"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation Left Arrow */}
      <button
        onClick={onPrev}
        aria-label="Previous image"
        className="absolute left-4 md:left-8 text-primary p-2 hover:opacity-50 transition-opacity z-50 cursor-pointer"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Navigation Right Arrow */}
      <button
        onClick={onNext}
        aria-label="Next image"
        className="absolute right-4 md:right-8 text-primary p-2 hover:opacity-50 transition-opacity z-50 cursor-pointer"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <svg
            className="animate-spin h-8 w-8 text-primary/30"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {/* Main Image */}
      <img
        src={currentSrc}
        alt={currentAlt || 'Enlarged view'}
        onLoad={onImageLoad}
        className={`max-w-full max-h-full object-contain shadow-2xl z-10 transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>,
    document.body
  );
};
