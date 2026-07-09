import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (cleanEmail) {
      showToast(`Subscription registered: ${cleanEmail}`);
      setEmail('');
    }
  };

  return (
    <section id="newsletter-opt" className="border-t border-secondary/40 py-16 px-6 bg-secondary/25">
      <div className="max-w-[500px] mx-auto text-center space-y-6">
        <h3 className="font-heading text-2xl font-light italic">Join the Journal</h3>
        <p className="text-xs text-text/60 leading-relaxed max-w-sm mx-auto">
          Sign up for deep-vetted design essays, architectural telemetry updates, and slow living meditations directly to your private inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex border border-primary/40 rounded-full overflow-hidden bg-bg p-1 focus-within:ring-1 focus-within:ring-primary focus-within:border-transparent transition-all"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-transparent flex-grow text-xs tracking-wider outline-none border-none py-3 px-6 text-text font-medium placeholder:text-text/30"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/95 text-bg font-heading text-[10px] tracking-widest font-bold uppercase rounded-full px-6 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};
