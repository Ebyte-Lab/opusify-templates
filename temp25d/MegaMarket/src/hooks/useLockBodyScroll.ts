import { useEffect } from 'react';

export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (active) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
    return undefined;
  }, [active]);
}
