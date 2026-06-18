import { useState, useEffect } from 'react';

export const useAnimatedValue = (targetValue, duration = 1000, delay = 100) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let frameId;

    const timer = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setValue(Math.floor(progress * targetValue));
        if (progress < 1) {
          frameId = window.requestAnimationFrame(step);
        }
      };
      frameId = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [targetValue, duration, delay]);

  return value;
};
