import React from 'react';
import {
  Layout,
  HeroSection,
  MarqueeTicker,
  WorkSection,
  ServicesSection,
  StudioSection,
  ContactSection,
} from './components';
import { marqueeItems } from './data/caseStudies';

export default function App() {
  return (
    <Layout>
      <main className="w-full">
        <HeroSection />
        <MarqueeTicker items={marqueeItems} />
        <WorkSection />
        <ServicesSection />
        <StudioSection />
        <ContactSection />
      </main>
    </Layout>
  );
}
