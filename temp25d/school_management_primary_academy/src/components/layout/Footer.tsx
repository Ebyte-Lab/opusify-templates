import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-4 border-gray-100 py-8 text-center text-sm font-semibold text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="flex items-center gap-1">
          Made with <Heart size={14} className="text-pink-500 fill-pink-500" /> for primary education.
        </p>
        <p>&copy; {new Date().getFullYear()} SunnySide Academy Parent Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
