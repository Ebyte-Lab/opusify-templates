import React, { useState } from 'react';
import { products } from '../../data/products';
import { useProductFilters } from '../../hooks/useProductFilters';
import { FilterSidebar } from '../filters/FilterSidebar';
import { MobileFilterSheet } from '../filters/MobileFilterSheet';
import { ProductCard } from '../sections/ProductCard';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

export const NewReleasesPage: React.FC = () => {
  const newReleaseProducts = products.filter((p) => p.isNewRelease);

  const {
    filters,
    toggleFreeShipping,
    toggleDeliveryTomorrow,
    setMaxPrice,
    toggleBrand,
    setMinRating,
    resetFilters,
    filteredProducts,
  } = useProductFilters(newReleaseProducts);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-6 flex gap-6">
      {/* Sidebar Filters */}
      <FilterSidebar
        freeShippingOnly={filters.freeShippingOnly}
        deliveryTomorrowOnly={filters.deliveryTomorrowOnly}
        maxPrice={filters.maxPrice}
        selectedBrands={filters.brands}
        minRating={filters.minRating}
        onToggleFreeShipping={toggleFreeShipping}
        onToggleDeliveryTomorrow={toggleDeliveryTomorrow}
        onPriceChange={setMaxPrice}
        onToggleBrand={toggleBrand}
        onRatingSelect={setMinRating}
        onReset={resetFilters}
      />

      {/* Main Content */}
      <div className="flex-1 space-y-6 min-w-0">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-sm p-8 text-white relative shadow-sm border border-indigo-700">
          <div className="max-w-xl">
            <span className="bg-yellow-400 text-text font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm">
              Fresh Arrivals
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-1">
              Hot New Releases
            </h2>
            <p className="text-sm text-indigo-100">
              Be the first to get your hands on our newest releases, fresh off the line.
            </p>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-text">New Arrivals</h2>
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {newReleaseProducts.length} newly released products.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 font-semibold text-sm rounded shadow-sm bg-white"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </Button>
        </div>

        {/* Grid with New Tags */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-secondary rounded-sm border border-gray-200 text-center shadow-sm">
            <p className="text-lg font-medium text-gray-600 mb-2">No matching products found.</p>
            <Button variant="secondary" onClick={resetFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 right-2 bg-blue-600 text-white font-heading font-bold px-2.5 py-0.5 text-[10px] rounded-sm uppercase tracking-wider shadow-md z-10">
                  New
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filters */}
      <MobileFilterSheet
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        freeShippingOnly={filters.freeShippingOnly}
        deliveryTomorrowOnly={filters.deliveryTomorrowOnly}
        maxPrice={filters.maxPrice}
        selectedBrands={filters.brands}
        minRating={filters.minRating}
        onToggleFreeShipping={toggleFreeShipping}
        onToggleDeliveryTomorrow={toggleDeliveryTomorrow}
        onPriceChange={setMaxPrice}
        onToggleBrand={toggleBrand}
        onRatingSelect={setMinRating}
        onReset={resetFilters}
      />
    </div>
  );
};

export default NewReleasesPage;
