import { Menu } from 'lucide-react';
import { navLinks } from '../../data/navLinks';
import { useActiveSection } from '../../hooks/useActiveSection';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const sectionIds = navLinks.map(link => link.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds, 'overview');

  return (
    <header className="w-full px-6 py-6 md:px-12 flex items-center justify-between z-40 relative">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-bg font-bold font-heading text-xl">
          D
        </div>
        <span className="font-heading text-lg tracking-wide hidden sm:block">DEV_FOLIO</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 bg-secondary/50 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-md">
        {navLinks.map((link) => {
          const targetId = link.href.replace('#', '');
          const isActive = activeSection === targetId;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive ? 'text-text' : 'text-text/70'
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <button
        onClick={onMenuToggle}
        className="md:hidden text-text hover:text-primary transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
