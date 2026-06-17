import React, { useState } from 'react';
import { CartProvider } from './components/cart/CartProvider';
import { useCart } from './hooks/useCart';
import { CartOverlay } from './components/cart/CartOverlay';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { Header, Footer } from './components/layout';
import { Hero3DViewer, FilterSidebar, ProductGrid, SpecsAccordion, ReviewsCarousel } from './components/sections';
import { products } from './data/products';

interface FilterParams {
  category: string | null;
  inStockOnly: boolean;
  cyberEditionOnly: boolean;
  refurbishedOnly: boolean;
}

const AppContent: React.FC = () => {
  const { clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [filters, setFilters] = useState<FilterParams>({
    category: null,
    inStockOnly: false,
    cyberEditionOnly: false,
    refurbishedOnly: false,
  });

  // Dynamic filtering logic based on sidebar controls
  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.inStockOnly && product.tag !== 'IN STOCK') {
      return false;
    }
    if (filters.cyberEditionOnly && product.tag !== 'CYBER EDITION') {
      return false;
    }
    if (filters.refurbishedOnly) {
      // Refurbished inventory is currently empty
      return false;
    }
    return true;
  });

  const handleCheckoutInit = () => {
    setIsCheckoutOpen(true);
    clearCart();
  };

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-primary/30 selection:text-primary">
      {/* Header Navigation */}
      <Header />

      {/* Main Page Sections */}
      <main className="pt-20">
        <Hero3DViewer />
        
        {/* Shop Section */}
        <section className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 relative items-start">
          <FilterSidebar filters={filters} onChangeFilters={setFilters} />
          <ProductGrid products={filteredProducts} />
        </section>

        {/* Specifications Accordion */}
        <SpecsAccordion />

        {/* User Reviews Snap Carousel */}
        <ReviewsCarousel />
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Cart Components & Modals */}
      <CartOverlay />
      <CartDrawer onInitializeCheckout={handleCheckoutInit} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
