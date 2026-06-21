import { useState, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';

export const useFocusMode = () => {
  const { preferences } = useCourse();
  const [revealHeader, setRevealHeader] = useState(false);

  useEffect(() => {
    if (!preferences.focusMode) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Reveal header if cursor is near the top (e.g. less than 60px)
      if (e.clientY < 60) {
        setRevealHeader(true);
      } else {
        setRevealHeader(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      setRevealHeader(false);
    };
  }, [preferences.focusMode]);

  return {
    isFocusMode: preferences.focusMode,
    revealHeader
  };
};
