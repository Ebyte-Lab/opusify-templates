// src/hooks/useActiveSection.ts
import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], rootMargin = '-30% 0px -60% 0px') {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, rootMargin]);

  return activeSection;
}
export default useActiveSection;
