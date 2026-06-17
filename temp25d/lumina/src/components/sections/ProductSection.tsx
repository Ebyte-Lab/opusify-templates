import React from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  id,
  title,
  subtitle,
  products,
}) => {
  return (
    <section id={id} className="max-w-7xl mx-auto px-6 lg:px-12 py-16 scroll-mt-24">
      <div className="text-center mb-16">
        <span className="text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full inline-block mb-4">
          {subtitle}
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-text font-medium">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
