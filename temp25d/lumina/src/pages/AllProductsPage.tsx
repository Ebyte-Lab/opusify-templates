import React, { useState } from 'react';
import { skincareProducts, supplementProducts, bundleProducts } from '../data/products';
import { ProductSection } from '../components/sections/ProductSection';

export const AllProductsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'skincare' | 'supplements' | 'bundles'>('all');

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl font-medium text-text mb-4">All Products</h1>
        <p className="text-text/60 max-w-md mx-auto">
          Explore our full line of botanical formulas designed for biological harmony.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-16 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            filter === 'all'
              ? 'bg-primary text-bg shadow-sm'
              : 'bg-secondary/35 text-primary hover:bg-secondary/50'
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('skincare')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            filter === 'skincare'
              ? 'bg-primary text-bg shadow-sm'
              : 'bg-secondary/35 text-primary hover:bg-secondary/50'
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        >
          Skincare
        </button>
        <button
          onClick={() => setFilter('supplements')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            filter === 'supplements'
              ? 'bg-primary text-bg shadow-sm'
              : 'bg-secondary/35 text-primary hover:bg-secondary/50'
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        >
          Supplements
        </button>
        <button
          onClick={() => setFilter('bundles')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            filter === 'bundles'
              ? 'bg-primary text-bg shadow-sm'
              : 'bg-secondary/35 text-primary hover:bg-secondary/50'
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
        >
          Bundles & Sets
        </button>
      </div>

      {/* Grid Display */}
      {filter === 'all' && (
        <div className="space-y-16">
          <ProductSection
            id="skincare-list"
            title="Skincare Essentials"
            subtitle="Botanical Skin"
            products={skincareProducts}
          />
          <ProductSection
            id="supplements-list"
            title="Wellness Supplements"
            subtitle="Nutritional Health"
            products={supplementProducts}
          />
          <ProductSection
            id="bundles-list"
            title="Curated Routines"
            subtitle="Bundles & Sets"
            products={bundleProducts}
          />
        </div>
      )}

      {filter === 'skincare' && (
        <ProductSection
          id="skincare-list"
          title="Skincare Essentials"
          subtitle="Botanical Skin"
          products={skincareProducts}
        />
      )}

      {filter === 'supplements' && (
        <ProductSection
          id="supplements-list"
          title="Wellness Supplements"
          subtitle="Nutritional Health"
          products={supplementProducts}
        />
      )}

      {filter === 'bundles' && (
        <ProductSection
          id="bundles-list"
          title="Curated Routines"
          subtitle="Bundles & Sets"
          products={bundleProducts}
        />
      )}
    </div>
  );
};
