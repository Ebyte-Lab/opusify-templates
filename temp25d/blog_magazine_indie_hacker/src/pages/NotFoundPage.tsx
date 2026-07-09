import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center font-heading space-y-6">
      <div className="bg-[#151515] border border-secondary rounded-lg overflow-hidden flex flex-col font-mono text-left max-w-md mx-auto shadow-xl">
        <div className="bg-secondary/40 px-4 py-2 border-b border-secondary/50 text-[10px] text-text/40 font-bold uppercase select-none">
          system error report
        </div>
        <div className="p-6 space-y-4">
          <div className="text-primary text-4xl font-extrabold tracking-widest">
            404
          </div>
          <div className="text-white font-bold text-sm">
            ERROR: ROUTE_NOT_FOUND
          </div>
          <p className="text-xs text-text/60 leading-relaxed">
            The target location does not exist in the route directory registries. Check host parameters or return home.
          </p>
        </div>
      </div>
      
      <div>
        <Link 
          to="/" 
          className="border border-primary text-primary px-5 py-2.5 hover:bg-primary hover:text-bg transition-all font-bold uppercase tracking-wider text-xs inline-block"
        >
          RETURN_TO_BASE
        </Link>
      </div>
    </div>
  );
};
