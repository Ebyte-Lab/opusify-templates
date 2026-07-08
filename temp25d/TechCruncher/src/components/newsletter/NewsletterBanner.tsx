import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export const NewsletterBanner: React.FC = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (cleanEmail) {
      toast.push(`Dispatch registered successfully for: ${cleanEmail}`);
      setEmail('');
    }
  };

  return (
    <div
      id="subscribe-banner"
      className="bg-gradient-to-br from-primary/10 via-secondary/40 to-bg border border-primary/30 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="space-y-2 max-w-md text-center md:text-left">
        <h3 className="font-heading text-xl uppercase tracking-wide">
          Subscribe to Dispatch
        </h3>
        <p className="text-xs text-text/75 leading-relaxed">
          Get highly vetted, technical reviews and breaking developer briefs delivered directly to your inbox. Zero marketing fluff.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 max-w-md relative z-10"
      >
        <input
          type="email"
          required
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-bg border border-borderCol rounded-xl px-4 py-3 outline-none text-xs text-text focus:border-primary flex-grow min-w-[200px]"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-green-700 text-white font-heading font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0"
        >
          Join Dispatch
        </button>
      </form>
    </div>
  );
};
export default NewsletterBanner;
