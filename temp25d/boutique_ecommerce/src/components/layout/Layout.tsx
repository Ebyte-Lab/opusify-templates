import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { useCart } from '@/hooks/useCart';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import CartOverlay from '../cart/CartOverlay';
import MiniCart from '../cart/MiniCart';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useCart();

  useBodyScrollLock(isOpen);

  return (
    <>
      <Header />
      {children}
      <Footer />

      <AnimatePresence>
        {isOpen && <CartOverlay />}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && <MiniCart />}
      </AnimatePresence>
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <LayoutContent>{children}</LayoutContent>
    </CartProvider>
  );
}
