import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { Product } from '../../types/product';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { X, Truck } from 'lucide-react';
import { StarRating } from '../ui/StarRating';
import { PriceTag } from '../ui/PriceTag';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';

interface ProductDetailContextType {
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  selectedProduct: Product | null;
}

const ProductDetailContext = createContext<ProductDetailContextType | undefined>(undefined);

export const useProductDetail = () => {
  const context = useContext(ProductDetailContext);
  if (!context) {
    throw new Error('useProductDetail must be used within a ProductDetailProvider');
  }
  return context;
};

interface ProductDetailProviderProps {
  children: ReactNode;
}

export const ProductDetailProvider: React.FC<ProductDetailProviderProps> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openProductDetail = (product: Product) => setSelectedProduct(product);
  const closeProductDetail = () => setSelectedProduct(null);

  return (
    <ProductDetailContext.Provider
      value={{ selectedProduct, openProductDetail, closeProductDetail }}
    >
      {children}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeProductDetail}
        />
      )}
    </ProductDetailContext.Provider>
  );
};

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem, open: openCart } = useCart();
  useLockBodyScroll(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });
    onClose();
    setTimeout(() => {
      openCart();
    }, 100);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-6 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-md shadow-2xl border border-gray-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-6 p-6 md:p-8 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1"
          aria-label="Close details dialog"
        >
          <X size={24} />
        </button>

        {/* Product Image Column */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 border border-gray-100 p-6 rounded-md">
          <img
            src={product.img}
            alt={product.name}
            className="max-h-[320px] md:max-h-[400px] object-contain mix-blend-multiply transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Product Info Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Best Seller Ribbon / Brand */}
            <div className="flex flex-wrap items-center gap-2">
              {product.bestSeller && <Badge variant="best-seller" />}
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {product.brand}
              </span>
            </div>

            {/* Title */}
            <h3 id="modal-title" className="text-xl md:text-2xl font-bold text-text leading-snug">
              {product.name}
            </h3>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} size={18} />
              <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                {product.reviews.toLocaleString()} global ratings
              </span>
            </div>

            <hr className="border-gray-200" />

            {/* Price & Badges */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500 font-medium">Price:</span>
                <PriceTag price={product.price} size="xl" />
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {product.prime ? <Badge variant="prime" /> : <Badge variant="standard-shipping" />}
                {product.freeShipping && (
                  <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2.5 py-0.5 rounded-full">
                    <Truck size={14} /> FREE Shipping
                  </span>
                )}
              </div>
            </div>

            {/* Stock status */}
            <div className="text-sm font-medium">
              {product.inStock ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Currently unavailable</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Specs Bullet List */}
            {product.specs && product.specs.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Product Details:
                </h4>
                <ul className="list-disc pl-5 text-xs text-gray-500 space-y-1">
                  {product.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-100">
            <Button
              variant="cta"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 rounded-md py-3 font-bold text-sm shadow-sm"
            >
              Add to Cart
            </Button>
            <Button
              variant="bundle"
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 rounded-md py-3 font-bold text-sm shadow-sm"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
