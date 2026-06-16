import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { navLinks } from '../../data/navLinks';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useBodyScrollLock(isOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll(
      'a[href], button, [tabindex="0"]'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus close button initially
    firstElement?.focus();

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const currentMenuRef = menuRef.current;
    currentMenuRef.addEventListener('keydown', handleFocusTrap);
    return () => {
      currentMenuRef.removeEventListener('keydown', handleFocusTrap);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur-md p-6 md:hidden"
    >
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="text-text hover:text-primary transition-colors p-2"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
      </div>

      <nav className="flex flex-col gap-6 text-center justify-center flex-grow">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-2xl font-semibold text-text hover:text-primary transition-colors py-3 px-4 w-full block rounded-xl hover:bg-secondary/50"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>,
    document.body
  );
}
