import React from 'react';
import { motion } from 'framer-motion';

const MenuToggle = ({ isOpen, onToggle }) => {
  const lineVariants = {
    top: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: 45, y: 8 },
    },
    middle: {
      closed: { opacity: 1 },
      open: { opacity: 0 },
    },
    bottom: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: -45, y: -8 },
    },
  };

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle Menu"
      className="fixed top-6 right-6 md:top-10 md:right-10 z-[70] w-14 h-14 rounded-full bg-text hover:bg-primary text-bg flex flex-col justify-center items-center gap-1.5 focus:outline-none transition-colors duration-300 shadow-2xl cursor-pointer"
    >
      <motion.span
        variants={lineVariants.top}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
        className="block w-6 h-0.5 bg-bg origin-center"
      />
      <motion.span
        variants={lineVariants.middle}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.2 }}
        className="block w-6 h-0.5 bg-bg origin-center"
      />
      <motion.span
        variants={lineVariants.bottom}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3 }}
        className="block w-6 h-0.5 bg-bg origin-center"
      />
    </button>
  );
};

export default MenuToggle;
