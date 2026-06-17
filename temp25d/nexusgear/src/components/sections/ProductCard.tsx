import React from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../../types/product';
import { Tag } from '../ui/Tag';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, open } = useCart();

  const handleAdd = () => {
    addItem(product);
    open();
  };

  return (
    <div className="neon-border bg-bg group flex flex-col h-full relative overflow-hidden select-none">
      <Tag tag={product.tag} className="absolute top-2 left-2 z-10" />
      <div className="h-48 bg-secondary overflow-hidden border-b border-secondary">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover filter grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg text-white mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="font-mono text-xs text-text/50 mb-4">{product.specs}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-heading text-lg text-white">${product.price.toFixed(2)}</span>
          <Button
            variant="outline"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={14} />
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};
