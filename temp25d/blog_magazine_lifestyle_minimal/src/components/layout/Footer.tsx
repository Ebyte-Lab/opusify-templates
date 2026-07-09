import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg border-t border-secondary/40 py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-text/40 font-medium">
        <div className="flex items-center gap-3">
          <span className="font-heading tracking-[0.1em] text-text text-sm">THE JOURNAL</span>
          <span>&copy; {new Date().getFullYear()} Opusify Scaffold Agency &bull; Fine Spec Edition</span>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary transition-colors">Editorial Integrity</Link>
          <Link to="/" className="hover:text-primary transition-colors">Vulnerability Audit</Link>
          <Link to="/" className="hover:text-primary transition-colors">Sitemap XML</Link>
        </div>
      </div>
    </footer>
  );
};
