import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CartBadgeProps {
  count: number;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ count }) => {
  const controls = useAnimation();

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.2 },
    });
  }, [count, controls]);

  return (
    <motion.span
      animate={controls}
      className="font-bold text-sm"
    >
      {count}
    </motion.span>
  );
};
