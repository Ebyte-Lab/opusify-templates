import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer className="bg-secondary/20 pt-20 pb-10 rounded-t-[3rem] mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 pr-0 md:pr-12">
            <a
              href="#/"
              className="font-heading text-3xl font-semibold text-primary mb-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md w-fit"
            >
              Lumina.
            </a>
            <p className="text-text/70 mb-8 max-w-md">
              Crafting organic goods that bring the intelligence of nature directly to your daily rituals.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Join our newsletter"
                  required
                  className="bg-white border-none rounded-full px-6 py-3 w-full max-w-[250px] focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary text-bg px-6 py-3 rounded-full font-semibold hover:bg-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
              {submitted && (
                <p className="text-sm text-primary font-semibold animate-pulse pl-4 mt-1">
                  Thank you! You have successfully subscribed.
                </p>
              )}
            </form>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Shop</h4>
            <ul className="space-y-3 text-text/70 text-sm">
              <li>
                <a
                  href="#/all-products"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="#/skincare"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Skincare
                </a>
              </li>
              <li>
                <a
                  href="#/supplements"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Supplements
                </a>
              </li>
              <li>
                <a
                  href="#/bundles"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Bundles & Sets
                </a>
              </li>
              <li>
                <a
                  href="#/gift-cards"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text mb-6">Support</h4>
            <ul className="space-y-3 text-text/70 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Wholesale
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
                >
                  Account
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text/50">
          <p>&copy; 2026 Lumina Organics. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline rounded"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
