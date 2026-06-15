import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { MobileMenu } from './components/layout/MobileMenu';
import { HeroGallery } from './components/sections/HeroGallery';
import { PortraitsSection } from './components/sections/PortraitsSection';
import { LandscapesSection } from './components/sections/LandscapesSection';
import { EditorialSection } from './components/sections/EditorialSection';
import { AboutSection } from './components/sections/AboutSection';
import { BookingFooter } from './components/sections/BookingFooter';
import { Lightbox } from './components/ui/Lightbox';
import { useMobileMenu } from './hooks/useMobileMenu';
import { useLightbox } from './hooks/useLightbox';
import { galleryImages } from './data/galleryImages';

export const App: React.FC = () => {
  const mobileMenu = useMobileMenu();
  const lightbox = useLightbox(galleryImages);

  return (
    <div className="flex flex-col md:flex-row min-h-screen selection:bg-primary selection:text-bg">
      {/* Mobile navigation header */}
      <MobileHeader
        isOpen={mobileMenu.isOpen}
        onMenuToggle={mobileMenu.toggle}
      />

      {/* Fullscreen Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenu.isOpen}
        onClose={mobileMenu.close}
      />

      {/* Fixed Sidebar navigation for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 lg:ml-72 w-full max-w-[100vw]">
        {/* Horizontal Snapping Hero Carousel */}
        <HeroGallery />

        {/* Portraits Category Portfolio Grid */}
        <PortraitsSection onImageSelect={lightbox.open} />

        {/* Landscapes Category Portfolio Grid */}
        <LandscapesSection onImageSelect={lightbox.open} />

        {/* Editorial Category Portfolio Grid */}
        <EditorialSection onImageSelect={lightbox.open} />

        {/* Photographer Biography / About Grid */}
        <AboutSection />

        {/* Contact/Booking Footer */}
        <BookingFooter />
      </main>

      {/* Lightbox Overlay */}
      <Lightbox
        isOpen={lightbox.isOpen}
        currentSrc={lightbox.currentSrc}
        currentAlt={lightbox.currentAlt}
        isLoading={lightbox.isLoading}
        onClose={lightbox.close}
        onImageLoad={lightbox.handleImageLoad}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
      />
    </div>
  );
};

export default App;
