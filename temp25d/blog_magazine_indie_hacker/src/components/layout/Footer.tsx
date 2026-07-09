import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg border-t border-secondary/40 py-10 mt-12 select-none">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-text/40 font-heading gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
          <span>SYSTEM_ONLINE // alex_rivera.sh</span>
        </div>
        <div className="flex gap-6">
          <Link to="/rss" className="hover:text-primary transition-colors">PGP_KEY</Link>
          <Link to="/rss" className="hover:text-primary transition-colors">LICENSE</Link>
          <Link to="/rss" className="hover:text-primary transition-colors">SITEMAP</Link>
        </div>
      </div>
    </footer>
  );
};
