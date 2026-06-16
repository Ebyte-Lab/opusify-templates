import { useRef } from 'react';

export function useScrollCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const { clientWidth } = trackRef.current;
    trackRef.current.scrollBy({
      left: direction === 'next' ? clientWidth * 0.4 : -clientWidth * 0.4,
      behavior: 'smooth',
    });
  };

  return {
    trackRef,
    scrollPrev: () => scrollByAmount('prev'),
    scrollNext: () => scrollByAmount('next'),
  };
}
