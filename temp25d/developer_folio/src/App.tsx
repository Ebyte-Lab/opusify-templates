import { useState } from 'react';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { BentoGrid } from './components/bento/BentoGrid';
import { RepositoriesSection } from './components/sections/RepositoriesSection';
import { ArticlesSection } from './components/sections/ArticlesSection';
import { UsesSection } from './components/sections/UsesSection';
import { Footer } from './components/layout/Footer';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-bg">
      <Header onMenuToggle={() => setIsMenuOpen(true)} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-20 pt-4">
        <BentoGrid />
        <RepositoriesSection />
        <ArticlesSection />
        <UsesSection />
      </main>

      <Footer />

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
