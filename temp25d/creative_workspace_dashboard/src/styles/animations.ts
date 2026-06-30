export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

export const cardVariants = {
  rest: { scale: 1, boxShadow: '0 0 0 rgba(168,85,247,0)' },
  hover: { scale: 1.01, boxShadow: '0 0 24px rgba(168,85,247,0.15)', transition: { duration: 0.2 } },
};

export const listVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const listItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } }
};
