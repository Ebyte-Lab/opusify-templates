import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/30 border-t border-borderCol py-12 mt-12 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-text/50 font-semibold gap-6">
        <div className="flex items-center gap-3">
          <span className="font-heading tracking-wider uppercase text-text text-sm">
            TECH<span className="text-primary">CRUNCHER</span>
          </span>
          <span>&copy; 2026 Opusify Scaffold Agency &middot; Premium Spec Edition</span>
        </div>
        <div className="flex gap-6">
          <a href="#integrity" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
            Editorial Integrity
          </a>
          <a href="#vulnerability" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
            Vulnerability Disclosure
          </a>
          <a href="#rss" onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors">
            RSS Index
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
