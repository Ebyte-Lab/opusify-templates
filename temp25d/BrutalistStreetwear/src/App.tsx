import { useState, useEffect, useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import MarqueeBar from './components/sections/MarqueeBar';
import ShopSection from './components/sections/ShopSection';
import ArchiveSection from './components/sections/ArchiveSection';
import FAQSection from './components/sections/FAQSection';
import MiniCart from './components/cart/MiniCart';
import CartOverlay from './components/cart/CartOverlay';
import CheckoutModal from './components/modals/CheckoutModal';
import ProductDetailModal from './components/modals/ProductDetailModal';
import type { Product } from './data/products';

function MainAppContent() {
  const { isCartOpen, closeCart, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Initialize target date once on mount (2 hours 45 minutes)
  const targetDateRef = useRef<Date | null>(null);
  if (!targetDateRef.current) {
    const time = new Date();
    time.setHours(time.getHours() + 2);
    time.setMinutes(time.getMinutes() + 45);
    targetDateRef.current = time;
  }

  // Keyboard listener: Escape key closes cart and modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
        setIsCheckoutModalOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeCart]);

  // Body scroll lock on cart open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    closeCart();
    setTimeout(() => {
      clearCart();
      setIsCheckoutModalOpen(true);
    }, 300);
  };

  return (
    <>
      <CartOverlay />
      <MiniCart onCheckout={handleCheckout} />
      <CheckoutModal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)} 
      />
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <Header />
      
      <main className="pt-[73px] md:pt-[81px]">
        <HeroSection targetDate={targetDateRef.current} />
        <MarqueeBar />
        <ShopSection onViewDetails={setSelectedProduct} />
        <ArchiveSection />
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}

export function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}

export default App;
