import { useState, useCallback } from 'react';

export function useSidebarDrawers() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const openLeft = useCallback(() => {
    setLeftOpen(true);
    setRightOpen(false);
  }, []);

  const openRight = useCallback(() => {
    setRightOpen(true);
    setLeftOpen(false);
  }, []);

  const closeAll = useCallback(() => {
    setLeftOpen(false);
    setRightOpen(false);
  }, []);

  return {
    leftOpen,
    rightOpen,
    openLeft,
    openRight,
    closeAll,
    setLeftOpen,
    setRightOpen,
  };
}
export type UseSidebarDrawersReturn = ReturnType<typeof useSidebarDrawers>;
