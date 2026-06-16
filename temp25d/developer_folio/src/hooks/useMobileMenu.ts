import { useState, useCallback } from 'react';

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
}
