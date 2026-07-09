import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.3
): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Check if container is within viewport bounds
      if (rect.top < viewHeight && rect.bottom > 0) {
        // Calculate standard scroll distance relative to the element's top position on page
        const scrolled = window.scrollY - (ref.current.offsetTop || 0);
        setOffset(scrolled * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial evaluation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed]);

  return offset;
}
