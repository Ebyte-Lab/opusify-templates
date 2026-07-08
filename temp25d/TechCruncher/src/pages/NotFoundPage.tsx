import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-32 text-center space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">
          ERROR 404
        </span>
        <h1 className="font-heading text-4xl md:text-5xl uppercase tracking-tighter">
          PAGE NOT FOUND
        </h1>
        <p className="text-text/60 text-sm leading-relaxed">
          The requested system node could not be resolved. It might have been deleted, renamed, or is temporarily offline.
        </p>
      </div>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-block bg-primary hover:bg-green-700 text-white font-heading text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md"
        >
          Return to Home Base
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
