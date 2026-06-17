import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`SECURE COMM LINK ESTABLISHED WITH: ${email.toUpperCase()}`);
    setEmail('');
  };

  return (
    <footer id="support" className="bg-[#05080f] border-t border-secondary pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-heading text-2xl text-white flex items-center gap-2 mb-4 focus-visible:ring-2 focus-visible:ring-primary rounded outline-none w-fit"
          >
            NEXUS<span className="text-primary">GEAR</span>
          </a>
          <p className="font-mono text-xs text-text/50 max-w-sm">
            Designing high-performance computational hardware for the next iteration of human development.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm text-white mb-4 tracking-widest">INDEX</h4>
          <ul className="space-y-2 font-mono text-xs text-text/60">
            <li>
              <a
                href="#"
                className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
              >
                Manifesto
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
              >
                Hardware Drivers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
              >
                Warranty Info
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
              >
                Telemetry Opt-out
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm text-white mb-4 tracking-widest">SECURE_COMMS</h4>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="ENTER COMM LINK"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-bg border border-secondary px-4 py-2 font-mono text-xs w-full focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors text-white placeholder:text-text/30"
              aria-label="Secure comm link email input"
              required
            />
            <button
              type="submit"
              className="bg-primary text-bg px-4 font-heading text-xs tracking-widest hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
            >
              INIT
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 pt-8 border-t border-secondary/50 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-text/40">
        <span>© 2026 NEXUSGEAR CORP. ALL SYSTEMS NOMINAL.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
          >
            GITHUB
          </a>
          <a
            href="#"
            className="hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
          >
            DISCORD
          </a>
          <a
            href="#"
            className="hover:text-primary focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
          >
            X_TERMINAL
          </a>
        </div>
      </div>
    </footer>
  );
};
