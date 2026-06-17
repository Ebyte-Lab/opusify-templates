import React from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { Button } from '../ui/Button';

interface ProductGridProps {
  products: Product[];
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-secondary rounded-sm border border-gray-200 text-center shadow-sm">
        <p className="text-lg font-medium text-gray-600 mb-2">
          No results match these filters.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Try expanding your price range, clearing some selections, or changing your search.
        </p>
        <Button variant="secondary" onClick={onResetFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div
      id="product-grid"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductGrid;
