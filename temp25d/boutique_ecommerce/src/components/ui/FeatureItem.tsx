import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FeatureType } from '@/types';

const getFeatureVariants = (reverse: boolean) => ({
  hidden: { opacity: 0, x: reverse ? 40 : -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
});

interface FeatureItemProps {
  feature: FeatureType;
}

export default function FeatureItem({ feature }: FeatureItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const variants = getFeatureVariants(feature.reverse);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 group cursor-pointer ${
        feature.reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Image Container */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="w-full md:w-3/5 aspect-[3/4] overflow-hidden bg-secondary"
      >
        <img
          src={feature.image}
          alt={feature.alt}
          className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
        />
      </motion.div>

      {/* Text block */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="w-full md:w-2/5 flex flex-col items-center md:items-start text-center md:text-left"
      >
        <span className="text-xs text-primary tracking-[0.2em] uppercase mb-4">
          {feature.eyebrow}
        </span>
        <h3 className="font-heading text-3xl md:text-4xl uppercase tracking-wider mb-6 text-text">
          {feature.title}
        </h3>
        <p className="text-sm font-light leading-loose text-text/70 mb-10 max-w-sm">
          {feature.description}
        </p>
        <button className="border border-text px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-text hover:text-bg transition-colors duration-500 w-full sm:w-auto focus:outline-none">
          {feature.cta}
        </button>
      </motion.div>
    </div>
  );
}
