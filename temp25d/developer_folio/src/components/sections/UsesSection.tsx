import { BentoCard } from '../ui/BentoCard';
import { usesData } from '../../data/uses';

export function UsesSection() {
  return (
    <section id="uses" className="pt-20 pb-10" aria-label="Uses Tools">
      <div className="mb-10 text-left">
        <h2 className="font-heading text-3xl md:text-4xl mb-3">Uses</h2>
        <p className="text-text/60 max-w-xl">
          A detailed breakdown of my workstation, editor choices, development environments, and standard software configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {usesData.map((category, idx) => (
          <BentoCard
            key={idx}
            ariaLabel={`Uses Category: ${category.category}`}
            className="p-6 flex flex-col"
          >
            <h3 className="font-heading font-bold text-lg text-primary mb-6 border-b border-white/5 pb-3">
              {category.category}
            </h3>
            <ul className="flex flex-col gap-6">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex flex-col gap-1">
                  <span className="font-heading font-medium text-text text-sm">
                    {item.name}
                  </span>
                  <span className="text-xs text-text/60 leading-relaxed">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
