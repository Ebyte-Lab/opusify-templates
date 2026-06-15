import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MenuToggle from '../navigation/MenuToggle';
import MobileMenu from '../navigation/MobileMenu';
import { useMenuToggle } from '../../hooks/useMenuToggle';

const Layout = ({ children }) => {
  const { isOpen, toggle, close } = useMenuToggle();

  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-secondary selection:text-bg">
      <Header />
      <MenuToggle isOpen={isOpen} onToggle={toggle} />
      <MobileMenu isOpen={isOpen} onClose={close} />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
