import React, { useState, useEffect } from 'react';
import { CartProvider } from './components/cart/CartProvider';
import { Header } from './components/layout/Header';
import { LowerNav } from './components/layout/LowerNav';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { FilterSidebar } from './components/filters/FilterSidebar';
import { MobileFilterSheet } from './components/filters/MobileFilterSheet';
import { PromoBanner } from './components/sections/PromoBanner';
import { BundleDeal } from './components/sections/BundleDeal';
import { ProductGrid } from './components/sections/ProductGrid';
import { useProductFilters } from './hooks/useProductFilters';
import { useCart } from './hooks/useCart';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from './components/ui/Button';
import { products } from './data/products';
import { ProductDetailProvider } from './components/product/ProductDetailProvider';

import {
  DealsPage,
  BestSellersPage,
  NewReleasesPage,
  CustomerServicePage,
} from './components/pages';

const AppContent: React.FC = () => {
  const {
    filters,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    toggleFreeShipping,
    toggleDeliveryTomorrow,
    setMaxPrice,
    toggleBrand,
    setMinRating,
    resetFilters,
    filteredProducts,
  } = useProductFilters(products);

  const { clearCart, close: closeCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentHash]);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      window.location.hash = '#/';
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (window.location.hash !== '#/' && window.location.hash !== '') {
      window.location.hash = '#/';
    }
  };

  const handleCheckout = () => {
    closeCart();
    setTimeout(() => {
      clearCart();
      setIsCheckoutOpen(true);
    }, 300);
  };

  const renderMainContent = () => {
    const route = currentHash.split('?')[0];

    switch (route) {
      case '#/deals':
        return <DealsPage />;
      case '#/best-sellers':
        return <BestSellersPage />;
      case '#/new-releases':
        return <NewReleasesPage />;
      case '#/customer-service':
        return <CustomerServicePage />;
      case '#/':
      default:
        return (
          <div className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-6 flex gap-6">
            {/* Desktop Filter Sidebar */}
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

            {/* Catalog Section */}
            <div className="flex-1 space-y-6 min-w-0">
              <PromoBanner />
              <BundleDeal />

              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-text">Results</h2>
                  <p className="text-sm text-gray-500">
                    Showing {filteredProducts.length} of 12 items
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                  </p>
                </div>

                {/* Mobile Filters Trigger */}
                <Button
                  variant="secondary"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 font-semibold text-sm rounded shadow-sm bg-white"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </Button>
              </div>

              <ProductGrid products={filteredProducts} onResetFilters={resetFilters} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-body antialiased">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={handleSearchSubmit}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategorySelect}
      />
      <LowerNav />

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0">
        {renderMainContent()}
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer onCheckout={handleCheckout} />

      {/* Checkout Success Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      {/* Mobile Filter Sheet */}
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

export const App: React.FC = () => {
  return (
    <CartProvider>
      <ProductDetailProvider>
        <AppContent />
      </ProductDetailProvider>
    </CartProvider>
  );
};

export default App;
