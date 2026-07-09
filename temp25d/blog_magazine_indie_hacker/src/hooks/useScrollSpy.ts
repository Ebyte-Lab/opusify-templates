import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 130): string => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const handleScroll = () => {
      let currentActive = '';
      
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Match the original prototype logic where top of element is <= 120-130px
          if (rect.top <= offset) {
            currentActive = id;
          }
        }
      }

      if (currentActive) {
        setActiveId(currentActive);
      } else {
        // Default to the first section if we haven't scrolled past any offset yet
        setActiveId(sectionIds[0]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial invocation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
};
