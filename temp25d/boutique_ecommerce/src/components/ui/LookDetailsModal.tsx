import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { LookbookSlideType } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useCartContext } from '@/context/CartContext';

interface LookDetailsModalProps {
  slide: LookbookSlideType | null;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};

export default function LookDetailsModal({ slide, onClose }: LookDetailsModalProps) {
  const { items: cartItems } = useCart();
  const { dispatch } = useCartContext();

  useBodyScrollLock(!!slide);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!slide) return null;

  const handleAddFeaturedItem = (itemName: string) => {
    const id = Date.now() + Math.random();
    const newItem = {
      id,
      image: slide.image,
      name: itemName,
      meta: 'Featured in ' + slide.label,
      price: itemName.toLowerCase().includes('coat') || itemName.toLowerCase().includes('blazer') || itemName.toLowerCase().includes('trench') ? 1250 : 895,
    };
    dispatch({ type: 'SET_ITEMS', payload: [...cartItems, newItem] });
    dispatch({ type: 'OPEN_CART' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
        className="absolute inset-0 bg-text/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Content Container */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-bg text-text w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-secondary"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text/60 hover:text-primary transition-colors focus:outline-none z-10 p-2"
          aria-label="Close details"
        >
          <X size={24} strokeWidth={1} />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 aspect-[2/3] bg-secondary">
          <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
        </div>

        {/* Right: Text and actions */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div className="mb-8">
            <span className="text-xs text-primary tracking-[0.2em] uppercase mb-2 block font-light">
              Look details · {slide.city}
            </span>
            <h2 className="font-heading text-3xl uppercase tracking-widest text-text mb-6">
              {slide.label}
            </h2>
            <p className="text-sm font-light leading-relaxed text-text/70 mb-8">
              {slide.description}
            </p>

            {slide.items && slide.items.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text/50 mb-4">
                  Featured Items
                </h4>
                <div className="space-y-4">
                  {slide.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 border-b border-secondary/50 group"
                    >
                      <span className="text-xs font-light text-text/80 tracking-wide">{item}</span>
                      <button
                        onClick={() => handleAddFeaturedItem(item)}
                        className="text-[10px] uppercase tracking-widest text-primary hover:text-text font-medium flex items-center gap-1.5 transition-colors focus:outline-none"
                      >
                        <ShoppingBag size={12} /> Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-secondary pt-6">
            <p className="text-[10px] text-text/40 tracking-widest uppercase font-light">
              * Seeded items will show up in the side cart immediately.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
