import { useState, useRef, useEffect } from 'react';

export function useTilt3D(maxDeg: number = 30) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(45deg) rotateY(0deg) rotateZ(45deg)');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        // Under reduced motion, we snap to a slight flat-facing hover elevation or keep default
        setTransform('rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1.02, 1.02, 1.02)');
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxDeg;
      const rotateX = -((y - centerY) / centerY) * maxDeg;

      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    };

    const handleMouseLeave = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setTransform('rotateX(45deg) rotateY(0deg) rotateZ(45deg)');
        return;
      }
      setTransform('rotateX(45deg) rotateY(0deg) rotateZ(45deg)');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxDeg]);

  return { containerRef, transformStyle: { transform } };
}
