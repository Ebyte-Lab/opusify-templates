import React from 'react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-chromeDark text-white mt-12">
      <Button
        variant="chrome"
        onClick={handleBackToTop}
        className="w-full text-center py-4 text-sm font-medium transition-colors"
        aria-label="Scroll back to top of the page"
      >
        Back to top
      </Button>
      <div className="max-w-[1000px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-4">Get to Know Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">About MegaMarket</a></li>
            <li><a href="#" className="hover:underline">Investor Relations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Make Money with Us</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Sell products</a></li>
            <li><a href="#" className="hover:underline">Sell on MegaMarket Business</a></li>
            <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Payment Products</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Business Card</a></li>
            <li><a href="#" className="hover:underline">Shop with Points</a></li>
            <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Let Us Help You</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Your Account</a></li>
            <li><a href="#" className="hover:underline">Your Orders</a></li>
            <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
            <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
            <li><a href="#" className="hover:underline">Customer Service</a></li>
          </ul>
        </div>
      </div>
      <div className="bg-chrome py-6 text-center text-xs text-gray-400">
        <p>&copy; 2026 MegaMarket. Scaffolded with Opusify Engine.</p>
      </div>
    </footer>
  );
};
export default Footer;
