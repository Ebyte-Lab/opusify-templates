import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';

export const CartOverlay: React.FC = () => {
  const { isOpen, close } = useCart();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={close}
      className="fixed inset-0 bg-bg/85 backdrop-blur-sm z-[60]"
    />
  );
};
