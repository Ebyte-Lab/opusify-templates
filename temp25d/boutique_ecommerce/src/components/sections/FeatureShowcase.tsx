import { features } from '@/data/features';
import FeatureItem from '../ui/FeatureItem';

export default function FeatureShowcase() {
  return (
    <section id="new" className="max-w-7xl mx-auto px-6 mb-32">
      <div className="grid grid-cols-1 gap-24 md:gap-32">
        {features.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
