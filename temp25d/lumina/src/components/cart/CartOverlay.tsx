import React from 'react';
import { motion } from 'framer-motion';

interface CartOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export const CartOverlay: React.FC<CartOverlayProps> = ({ isOpen, onClick }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-text/20 z-[60] backdrop-blur-[2px]"
      onClick={onClick}
    />
  );
};
