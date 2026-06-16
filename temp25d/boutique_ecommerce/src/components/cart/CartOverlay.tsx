import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export default function CartOverlay() {
  const { close } = useCart();

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={close}
      className="fixed inset-0 bg-text/40 z-[60] backdrop-blur-sm cursor-pointer"
    />
  );
}
