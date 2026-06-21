import { useEffect, useRef } from 'react';
import { useCourse } from '../context/CourseContext';

export const usePictureInPicture = <T extends HTMLElement>() => {
  const { pipActive, setPipActive, pipDismissed, setPipDismissed } = useCourse();
  const anchorRef = useRef<T>(null);

  useEffect(() => {
    const element = anchorRef.current;
    if (!element) return;

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px 0px 0px', // Header offset
      threshold: 0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      // Check if it's out of view above the top boundary
      const isOutAbove = !entry.isIntersecting && entry.boundingClientRect.bottom < 80;
      
      if (isOutAbove && !pipDismissed) {
        setPipActive(true);
      } else {
        setPipActive(false);
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [pipDismissed, setPipActive]);

  const dismissPip = () => {
    setPipDismissed(true);
    setPipActive(false);
  };

  return {
    anchorRef,
    pipActive: pipActive && !pipDismissed,
    dismissPip,
  };
};
