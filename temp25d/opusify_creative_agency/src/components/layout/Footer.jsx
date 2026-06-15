import React from 'react';
import { footerLinks } from '../../data/caseStudies';

const Footer = () => {
  return (
    <footer className="bg-text text-bg pt-16 pb-12 relative overflow-hidden">
      {/* Decorative blurred circle */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-bg/10 pb-8">
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <h2 className="font-heading font-extrabold text-6xl md:text-8xl text-primary hover:text-bg transition-colors duration-500 cursor-pointer select-none">
              STAY<br />LOUD.
            </h2>
          </div>
          <div className="flex flex-col space-y-2 text-md font-medium text-right w-full md:w-auto font-body">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5 inline-block"
              >
                {link.label}
              </a>
            ))}
            <p className="text-bg/40 mt-2">
              Kigali, Rwanda <br /> GMT+2
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs font-semibold text-bg/30 uppercase tracking-widest font-heading">
          <span>© 2026 Opusify Agency</span>
          <span>Stay Loud.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
