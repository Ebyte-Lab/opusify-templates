import MobileNavBar from '../navigation/MobileNavBar';
import DesktopNav from '../navigation/DesktopNav';

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 pt-8 pb-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Mobile Navbar */}
        <MobileNavBar />

        {/* Desktop Wordmark */}
        <a
          href="#"
          className="hidden md:block font-heading text-4xl uppercase tracking-[0.3em] text-bg mb-8 hover:text-primary transition-colors duration-500 mix-blend-difference"
        >
          Atelier Opusify
        </a>

        {/* Desktop Nav */}
        <DesktopNav />
      </div>
    </header>
  );
}
