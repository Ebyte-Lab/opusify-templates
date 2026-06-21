import { useEffect } from 'react';
import { useCourse } from '../context/CourseContext';

export const useReadingProgress = () => {
  const { setReadingProgress, readingProgress } = useCourse();

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height <= 0) {
        setReadingProgress(0);
        return;
      }
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(Math.min(100, Math.max(0, Math.round(scrolled))));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setReadingProgress]);

  return readingProgress;
};
