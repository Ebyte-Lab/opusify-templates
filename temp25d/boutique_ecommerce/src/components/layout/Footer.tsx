import { serviceLinks, socialLinks } from '@/data/footerColumns';
import NewsletterForm from '../ui/NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-secondary pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        {/* Brand Block */}
        <div className="md:col-span-2">
          <a href="#" className="font-heading text-3xl uppercase tracking-[0.3em] text-text mb-8 block leading-tight">
            Atelier<br />Opusify
          </a>
          <p className="text-sm font-light leading-relaxed text-text/60 max-w-sm">
            Elevating the essentials through meticulous craftsmanship and sustainable sourcing.
          </p>
        </div>

        {/* Services Column */}
        <div className="flex flex-col space-y-4">
          <span className="font-heading text-xs uppercase tracking-widest mb-2 font-semibold">Services</span>
          {serviceLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs font-light tracking-wide text-text/70 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col space-y-4">
          <span className="font-heading text-xs uppercase tracking-widest mb-2 font-semibold">Newsletter</span>
          <p className="text-xs font-light tracking-wide text-text/70 mb-4">
            Subscribe for private access to new collections and exclusive events.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-text/40 tracking-widest uppercase border-t border-secondary pt-8">
        <span className="mb-4 md:mb-0">&copy; 2026 Opusify Scaffold Engine</span>
        <div className="flex space-x-6">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
