import React, { useState } from 'react';
import { SOCIAL_LINKS, LEGAL_LINKS } from '../../data/products';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-text text-bg heavy-border-t">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-16 heavy-border-r heavy-border-b md:heavy-border-b-0">
          <h3 className="font-heading text-4xl mb-4">JOIN THE SYNDICATE</h3>
          <p className="text-sm font-bold mb-6">Enter your comms channel to get early access to future drops. No spam, just heat.</p>
          <form className="flex w-full heavy-border brutal-hover" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={isSubscribed ? "TRANSMISSION SECURED" : "EMAIL ADDRESS"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubscribed}
              required
              className="flex-1 bg-bg text-text p-4 focus:outline-none font-bold placeholder:text-secondary disabled:opacity-75"
              aria-label="Email address for early drop access"
            />
            <button
              type="submit"
              className="bg-primary text-text px-8 font-heading text-2xl hover:bg-text hover:text-bg transition-colors"
              disabled={isSubscribed}
            >
              {isSubscribed ? "DONE" : "SUBMIT"}
            </button>
          </form>
        </div>
        <div className="p-8 md:p-16 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-bold text-sm hover:text-primary uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col space-y-2">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-bold text-sm hover:text-primary uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <p className="text-xs font-bold text-bg/50 uppercase select-none">
            © 2026 OPUSIFY [SYSTEM ARCHITECTURE]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
