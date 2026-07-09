import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast(`Telemetry terminal synched for: ${email.trim()}`);
      setEmail('');
    }
  };

  return (
    <section 
      id="newsletter" 
      className="bg-secondary/20 border border-secondary/50 rounded-xl p-6 sm:p-8 flex flex-col gap-4 scroll-mt-24"
    >
      <div>
        <h3 className="font-heading text-lg font-bold text-white mb-1">
          Get Technical Logs
        </h3>
        <p className="text-xs text-text/60 leading-relaxed">
          No marketing fluff. Just raw Docker telemetry configurations, Go compiler strategies, and architecture briefs directly to your standard inbox.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@domain.sh" 
          className="bg-[#151515] border border-secondary rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary flex-grow font-mono"
        />
        <button 
          type="submit" 
          className="bg-primary hover:bg-pink-600 text-bg font-heading text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};
