import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';

const panelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  exit: { x: '100%', transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
};

export default function MiniCart() {
  const { items, close, removeItem, subtotal } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-bg z-[70] shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-secondary">
        <h2 className="font-heading text-xl uppercase tracking-widest text-text">
          Your Cart
        </h2>
        <button
          onClick={close}
          className="text-text hover:text-primary transition-colors focus:outline-none p-2"
          aria-label="Close Cart"
        >
          <X size={24} strokeWidth={1} />
        </button>
      </div>

      {/* Body / List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        {items.length === 0 ? (
          <p className="text-sm font-light text-text/50 tracking-wider text-center mt-12">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeItem} />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-secondary bg-bg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs uppercase tracking-widest font-light text-text/60">
            Subtotal
          </span>
          <span className="font-heading text-lg tracking-wider">
            ${subtotal.toLocaleString()}
          </span>
        </div>

        <button
          disabled={items.length === 0}
          className="w-full bg-text text-bg py-4 text-xs uppercase tracking-[0.2em] hover:bg-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>

        <p className="text-center text-[10px] text-text/40 tracking-widest mt-4 uppercase">
          Complimentary Worldwide Shipping
        </p>
      </div>
    </motion.div>
  );
}
