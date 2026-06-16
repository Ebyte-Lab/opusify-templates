import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], defaultSection: string = 'overview') {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Triggers when section occupies the active zone
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          observer.unobserve(el);
        }
      });
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
