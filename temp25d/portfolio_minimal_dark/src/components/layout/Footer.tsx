// src/components/layout/Footer.tsx
import React from 'react';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { socialLinks } from '../../data/socials';

export const Footer: React.FC = () => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-secondary py-8 mt-12 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-text/40 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.6)]"></span>
          System nominal. Exit code 0.
        </div>
        <div className="flex space-x-6 text-sm text-text/60 font-heading">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
              aria-label={`${social.platform} profile`}
            >
              {getIcon(social.platform)}
              <span className="capitalize">{social.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
