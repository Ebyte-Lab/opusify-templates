import { useCart } from '@/hooks/useCart';
import { navLinks } from '@/data/navLinks';
import NavLink from './NavLink';

export default function DesktopNav() {
  const { toggle } = useCart();

  return (
    <nav className="hidden md:flex items-center space-x-10 text-[11px] font-medium tracking-[0.2em] uppercase text-bg mix-blend-difference">
      {navLinks.map((link, idx) => (
        <NavLink key={idx} href={link.href}>
          {link.label}
        </NavLink>
      ))}
      <button
        onClick={toggle}
        className="nav-link hover:text-primary transition-colors duration-300 flex items-center gap-2 focus:outline-none"
      >
        Cart <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
      </button>
    </nav>
  );
}
