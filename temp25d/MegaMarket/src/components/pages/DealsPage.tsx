import React, { useState, useEffect } from 'react';
import { products } from '../../data/products';
import { useProductFilters } from '../../hooks/useProductFilters';
import { FilterSidebar } from '../filters/FilterSidebar';
import { MobileFilterSheet } from '../filters/MobileFilterSheet';
import { ProductGrid } from '../sections/ProductGrid';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

export const DealsPage: React.FC = () => {
  const dealProducts = products.filter((p) => p.isDeal);
  const {
    filters,
    toggleFreeShipping,
    toggleDeliveryTomorrow,
    setMaxPrice,
    toggleBrand,
    setMinRating,
    resetFilters,
    filteredProducts,
  } = useProductFilters(dealProducts);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Simulated countdown timer details
  const [timeLeft, setTimeLeft] = useState('04h 23m 15s');
  
  useEffect(() => {
    const timer = setInterval(() => {
      const hours = Math.floor(Math.random() * 5) + 1;
      const minutes = Math.floor(Math.random() * 59);
      const seconds = Math.floor(Math.random() * 59);
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}h ${minutes
          .toString()
          .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
      );
    }, 10000);
    return () => clearInterval(timer);
  }, []);

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
        {/* Deal Hero */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-sm p-8 text-white relative shadow-sm border border-red-700">
          <div className="max-w-xl">
            <span className="bg-yellow-400 text-text font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm">
              Limited Time Only
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-1">
              MEGA DEALS Clearance
            </h2>
            <p className="text-sm md:text-base text-red-50 opacity-90 mb-4">
              Get the best discounts on electronics, accessories, and home furniture. While supplies last!
            </p>
            <div className="flex items-center gap-2 text-xs md:text-sm bg-black/20 px-3 py-1.5 rounded-sm w-fit font-mono">
              <span>Time remaining:</span>
              <span className="font-bold text-yellow-300">{timeLeft}</span>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-text">Mega Deal Results</h2>
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {dealProducts.length} deal products.
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

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} onResetFilters={resetFilters} />
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

export default DealsPage;
