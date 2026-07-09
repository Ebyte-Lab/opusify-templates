import { useEffect, useState } from 'react';

export const useLiveCounter = (seed: number, intervalMs: number = 4000): number => {
  const [count, setCount] = useState(seed);

  useEffect(() => {
    // Re-seed if prop changes
    setCount(seed);
  }, [seed]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time reader drift
      if (Math.random() > 0.4) {
        setCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [intervalMs]);

  return count;
};
