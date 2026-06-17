import type { FC } from 'react';
import type { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  return (
    <div className="heavy-border-r heavy-border-b flex flex-col bg-bg">
      <div 
        onClick={() => onViewDetails(product)}
        className="w-full aspect-[3/4] relative overflow-hidden product-img-container heavy-border-b bg-secondary cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`View details of ${product.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onViewDetails(product);
          }
        }}
      >
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover absolute inset-0" 
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-bg text-text text-xs font-bold px-2 py-1 heavy-border z-10">
          {product.stock}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading text-3xl mb-1">{product.name}</h3>
        <p className="text-primary font-bold mb-6">${product.price.toFixed(2)}</p>
        <div className="mt-auto flex gap-3">
          <button 
            type="button"
            onClick={() => addToCart(product)} 
            className="flex-1 bg-text text-bg font-heading text-xl py-3 brutal-hover brutal-hover-invert heavy-border focus:outline-none"
            aria-label={`Add ${product.name} to cart`}
          >
            ADD TO CART
          </button>
          <button 
            type="button"
            onClick={() => onViewDetails(product)} 
            className="bg-bg text-text font-heading text-xl px-4 py-3 brutal-hover heavy-border focus:outline-none"
            aria-label={`More information about ${product.name}`}
          >
            INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
