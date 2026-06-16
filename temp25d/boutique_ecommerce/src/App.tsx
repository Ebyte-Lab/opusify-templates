import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LookbookSlideType } from './types';
import {
  Layout,
  HeroSection,
  IntroStatement,
  FeatureShowcase,
  LookbookCarousel,
  LookDetailsModal,
} from './components';

export default function App() {
  const [selectedLook, setSelectedLook] = useState<LookbookSlideType | null>(null);

  return (
    <Layout>
      <main>
        {/* Immersive Campaign Hero */}
        <HeroSection />

        {/* Large Statement */}
        <IntroStatement />

        {/* Alternate Columns Feature Showcase */}
        <FeatureShowcase />

        {/* Horizontal Lookbook Carousel */}
        <LookbookCarousel onViewDetails={(slide) => setSelectedLook(slide)} />
      </main>

      {/* Lookbook Details Modal Drawer */}
      <AnimatePresence>
        {selectedLook && (
          <LookDetailsModal
            slide={selectedLook}
            onClose={() => setSelectedLook(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
