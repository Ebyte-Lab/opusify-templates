import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="flex-1 w-full" id="laptops">
      <div className="flex items-center justify-between mb-6 border-b border-secondary pb-4 select-none">
        <h2 className="font-heading text-2xl text-white">HARDWARE_MATRIX</h2>
        <div className="font-mono text-xs text-text/60">
          SHOWING: {products.length} {products.length === 1 ? 'ASSET' : 'ASSETS'}
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-secondary p-16 text-center font-mono text-sm text-text/45">
          &gt; NO CORE_ASSETS MATCHING FILTER PARAMETERS
        </div>
      )}
    </div>
  );
};
