import React from 'react';
import { skincareProducts } from '../data/products';
import { ProductSection } from '../components/sections/ProductSection';

export const SkincarePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl font-medium text-text mb-4">Skincare Rituals</h1>
        <p className="text-text/60 max-w-md mx-auto">
          Experience biological restoration through plant actives. Free from synthetics and artificial preservatives.
        </p>
      </div>

      <ProductSection
        id="skincare-list"
        title="Skincare Essentials"
        subtitle="Botanical Skin"
        products={skincareProducts}
      />
    </div>
  );
};
