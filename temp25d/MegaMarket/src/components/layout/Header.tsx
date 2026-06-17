import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { SearchBar } from './SearchBar';
import { CartBadge } from '../cart/CartBadge';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { toggle } = useCart();

  return (
    <header className="bg-chrome text-white sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#/"
          className="font-heading text-2xl font-bold text-white tracking-tight flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          MEGA<span className="text-primary">MARKET</span>
        </a>

        {/* Fused Search Bar - Desktop */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            type="button"
            className="text-sm font-bold flex flex-col items-start hover:border-white border border-transparent p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
          >
            <span className="text-xs font-normal text-gray-300">Hello, Sign in</span>
            <span>Account & Lists</span>
          </button>
          <button
            type="button"
            className="text-sm font-bold flex flex-col items-start hover:border-white border border-transparent p-1 rounded-sm hidden sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
          >
            <span className="text-xs font-normal text-gray-300">Returns</span>
            <span>& Orders</span>
          </button>
          <button
            onClick={toggle}
            className="flex items-center gap-1 font-bold text-lg hover:border-white border border-transparent p-1 rounded-sm relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
            aria-label="Open shopping cart drawer"
          >
            <div className="relative">
              <ShoppingCart size={32} strokeWidth={1.5} />
              <CartBadge />
            </div>
            <span className="mt-2 text-sm hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* Fused Search Bar - Mobile */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isMobile
      />
    </header>
  );
};
export default Header;
