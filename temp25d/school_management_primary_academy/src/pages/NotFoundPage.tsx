import React from 'react';
import { Button } from '../components/ui/Button';
import { Star, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-8 min-h-[400px] animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-primary/20 text-primary rounded-3xl flex items-center justify-center shadow-chunky text-white mb-6 animate-bounce">
        <Star size={40} fill="currentColor" stroke="none" />
      </div>
      
      <h1 className="font-heading text-4xl text-text mb-2">404 - Page Not Found</h1>
      <p className="text-gray-500 font-semibold max-w-md mb-8 leading-relaxed">
        Oops! It looks like you've wandered out of the school yard. The page you are looking for does not exist.
      </p>

      <Button variant="chunky" to="/" className="px-8 py-3.5">
        <Home size={18} strokeWidth={2.5} />
        Back to Dashboard
      </Button>
    </div>
  );
};
export default NotFoundPage;
