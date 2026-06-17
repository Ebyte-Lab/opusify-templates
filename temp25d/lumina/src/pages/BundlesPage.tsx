import React from 'react';
import { bundleProducts } from '../data/products';
import { ProductSection } from '../components/sections/ProductSection';

export const BundlesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl font-medium text-text mb-4">Curated Bundles & Sets</h1>
        <p className="text-text/60 max-w-md mx-auto">
          Complete ritual sets tailored for specific needs, combining skin restoration and inner balance. Save up to 20% on kits.
        </p>
      </div>

      <ProductSection
        id="bundles-list"
        title="Routine Packages"
        subtitle="Bundles & Sets"
        products={bundleProducts}
      />
    </div>
  );
};
