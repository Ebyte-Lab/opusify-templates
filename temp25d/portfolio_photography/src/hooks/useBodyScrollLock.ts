import { useEffect } from 'react';

export const useBodyScrollLock = (active: boolean): void => {
  useEffect(() => {
    if (active) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [active]);
};
