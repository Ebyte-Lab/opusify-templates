import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (product) {
      closeBtnRef.current?.focus();
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[90] flex items-center justify-center transition-opacity duration-300 px-4 py-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-bg text-text heavy-border w-full max-w-4xl p-6 md:p-8 relative transform transition-transform duration-300 scale-100 flex flex-col md:flex-row gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-primary text-text heavy-border p-2 brutal-hover focus:outline-none z-20"
          aria-label="Close details"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden heavy-border bg-secondary flex-shrink-0">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-bg text-text text-xs font-bold px-2 py-1 heavy-border z-10">
            {product.stock}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between py-2">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">// SPECIFICATION</span>
            <h2 id="detail-modal-title" className="font-heading text-4xl md:text-5xl leading-tight mb-2">
              {product.name}
            </h2>
            <div className="text-primary font-heading text-3xl mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-sm leading-relaxed mb-6 border-l-4 border-primary pl-4 font-semibold text-text/90">
              {product.description}
            </p>

            {product.details && product.details.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider mb-3 text-text/50">SYSTEM SPECIFICATIONS:</h4>
                <ul className="space-y-1.5 text-xs font-bold font-body">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-primary mr-2">▪</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-text font-heading text-2xl py-4 brutal-hover heavy-border focus:outline-none"
            >
              ADD TO STASH
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-text text-bg font-heading text-2xl py-4 brutal-hover brutal-hover-invert heavy-border focus:outline-none"
            >
              CLOSE INFO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
