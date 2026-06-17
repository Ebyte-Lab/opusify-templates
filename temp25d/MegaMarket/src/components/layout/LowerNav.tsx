import React from 'react';
import { MegaMenu } from './MegaMenu';

export const LowerNav: React.FC = () => {
  return (
    <nav className="bg-chromeDark px-4 py-1.5 text-sm font-medium flex items-center gap-6 overflow-x-auto whitespace-nowrap text-white">
      <MegaMenu />
      
      <a
        href="#/deals"
        className="hover:border-white border border-transparent px-2 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Deals
      </a>
      <a
        href="#/best-sellers"
        className="hover:border-white border border-transparent px-2 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Best Sellers
      </a>
      <a
        href="#/customer-service"
        className="hover:border-white border border-transparent px-2 py-1 rounded-sm hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Customer Service
      </a>
      <a
        href="#/new-releases"
        className="hover:border-white border border-transparent px-2 py-1 rounded-sm hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        New Releases
      </a>
    </nav>
  );
};
export default LowerNav;
