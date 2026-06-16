import { Layers } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { TechTile } from '../ui/TechTile';
import { techStack } from '../../data/techStack';

export function TechStackCard() {
  return (
    <BentoCard
      ariaLabel="Tech Stack"
      className="col-span-1 lg:col-span-1 row-span-2 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl">Tech Stack</h2>
        <Layers className="text-text/40" size={20} />
      </div>
      <div className="grid grid-cols-3 gap-3 flex-grow">
        {techStack.map((tech) => (
          <TechTile key={tech.id} {...tech} />
        ))}
      </div>
    </BentoCard>
  );
}
