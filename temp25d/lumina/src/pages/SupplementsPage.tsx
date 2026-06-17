import React from 'react';
import { supplementProducts } from '../data/products';
import { ProductSection } from '../components/sections/ProductSection';

export const SupplementsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl font-medium text-text mb-4">Wellness Supplements</h1>
        <p className="text-text/60 max-w-md mx-auto">
          Nourish your body from within using potent superfoods and clean herbal extract blends.
        </p>
      </div>

      <ProductSection
        id="supplements-list"
        title="Wellness Supplements"
        subtitle="Nutritional Health"
        products={supplementProducts}
      />
    </div>
  );
};
