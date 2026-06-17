import React from 'react';
import { AccordionItem } from './AccordionItem';
import { specsData } from '../../data/specs';
import { useAccordion } from '../../hooks/useAccordion';

export const SpecsAccordion: React.FC = () => {
  const { isOpen, toggle } = useAccordion();

  return (
    <section id="specs" className="bg-secondary/20 border-y border-secondary py-16">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-12 select-none">
          <h2 className="font-heading text-3xl text-white mb-4">SYSTEM_SPECIFICATIONS</h2>
          <p className="font-mono text-sm text-text/60">Detailed telemetry and hardware parameters</p>
        </div>
        <div className="space-y-4 font-mono text-sm">
          {specsData.map((group) => (
            <AccordionItem
              key={group.id}
              group={group}
              isOpen={isOpen(group.id)}
              onToggle={() => toggle(group.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
