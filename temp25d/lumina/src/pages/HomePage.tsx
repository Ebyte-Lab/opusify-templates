import React from 'react';
import { Hero } from '../components/sections/Hero';
import { SustainabilityMetrics } from '../components/sections/SustainabilityMetrics';
import { ProductSection } from '../components/sections/ProductSection';
import { MissionBanner } from '../components/sections/MissionBanner';
import { skincareProducts, supplementProducts } from '../data/products';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <SustainabilityMetrics />
      
      <ProductSection
        id="skincare"
        title="Daily Skincare Rituals"
        subtitle="Skincare"
        products={skincareProducts}
      />
      
      <ProductSection
        id="supplements"
        title="Botanical Supplements"
        subtitle="Supplements"
        products={supplementProducts}
      />
      
      <MissionBanner />
    </>
  );
};
