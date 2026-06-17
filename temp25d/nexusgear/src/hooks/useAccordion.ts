import { useState } from 'react';

export function useAccordion(initialOpenIds: string[] = []) {
  const [openIds, setOpenIds] = useState<string[]>(initialOpenIds);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isOpen = (id: string) => openIds.includes(id);

  return { isOpen, toggle };
}
