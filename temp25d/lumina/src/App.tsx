import React, { useState, useEffect } from 'react';
import { CartProvider } from './components/cart/CartProvider';
import { useCart } from './hooks/useCart';
import { FloatingNavbar } from './components/layout/FloatingNavbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { SkincarePage } from './pages/SkincarePage';
import { SupplementsPage } from './pages/SupplementsPage';
import { BundlesPage } from './pages/BundlesPage';
import { GiftCardsPage } from './pages/GiftCardsPage';

const AppContent: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const { close, clearCart } = useCart();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Scroll to the top of viewport on hash route changes
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCheckoutSuccess = () => {
    // Smooth transition: close drawer, clear items, and open confirmation
    close();
    clearCart();
    setIsCheckoutOpen(true);
  };

  const renderPage = () => {
    switch (currentHash) {
      case '#/all-products':
        return <AllProductsPage />;
      case '#/skincare':
        return <SkincarePage />;
      case '#/supplements':
        return <SupplementsPage />;
      case '#/bundles':
        return <BundlesPage />;
      case '#/gift-cards':
        return <GiftCardsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary/20">
      <FloatingNavbar activeHash={currentHash} />
      
      <main className="pt-24 min-h-[70vh]">
        {renderPage()}
      </main>

      <Footer />

      {/* Cart & Checkout Overlays */}
      <CartDrawer onCheckoutSuccess={handleCheckoutSuccess} />
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
