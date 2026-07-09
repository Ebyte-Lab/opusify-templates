import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20 space-y-6">
      <span className="text-xs font-heading tracking-[0.3em] uppercase text-primary font-bold">
        Error 404
      </span>
      <h1 className="font-heading text-4xl md:text-6xl font-light italic">
        Page Not Found
      </h1>
      <p className="text-sm text-text/60 max-w-xs leading-relaxed">
        The path you are looking for does not exist or has been shifted into visual silence.
      </p>
      <Link
        to="/"
        className="font-heading text-[10px] tracking-[0.2em] uppercase font-bold border border-primary/50 text-text/80 px-6 py-3 hover:bg-primary hover:text-white transition-all duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
};
