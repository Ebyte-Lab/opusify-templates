import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-6 animate-scale-up">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="font-heading text-3xl font-extrabold text-white">404: Stack Overflow</h1>
        <p className="text-xs text-text/50 font-mono">
          err_route_not_found: The page you are looking for does not exist on this server. Check your router configuration or return to base.
        </p>
      </div>

      <div className="bg-[#18181B] border border-secondary rounded-lg p-4 font-mono text-left text-xs max-w-md w-full select-none text-text/60">
        <div className="text-red-400 font-bold mb-1">Stack Trace:</div>
        <div>at AppRouter.tsx:42</div>
        <div>at RouteResolver.js:109</div>
        <div>at requestAnimationFrame (async)</div>
        <div className="text-primary mt-2">Active session: Alex.dev (FS-Web Cohort-42)</div>
      </div>

      <Link to="/modules">
        <Button variant="primary" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Back to Curriculum
        </Button>
      </Link>
    </div>
  );
};
