import React from 'react';
import { Leaf, Sprout, Globe } from 'lucide-react';
import { StatCounter } from './StatCounter';

export const SustainabilityMetrics: React.FC = () => {
  return (
    <section className="bg-secondary/10 py-16 rounded-[3rem] my-12 max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCounter
          target={15000}
          label="Plastic Bottles Saved"
          suffix="+"
          icon={<Leaf className="w-6 h-6" />}
        />
        <StatCounter
          target={100}
          label="Carbon Neutral Deliveries"
          suffix="%"
          icon={<Sprout className="w-6 h-6" />}
        />
        <StatCounter
          target={10000}
          label="Trees Planted"
          suffix="+"
          icon={<Globe className="w-6 h-6" />}
        />
      </div>
    </section>
  );
};
