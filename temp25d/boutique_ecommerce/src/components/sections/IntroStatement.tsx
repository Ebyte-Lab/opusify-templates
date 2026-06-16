import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <h2 className="font-heading text-2xl md:text-3xl leading-relaxed text-text/90 font-light mb-8">
          Crafted with an uncompromising dedication to minimalist principles and exceptional materials. Our latest collection redefines modern luxury.
        </h2>
        <a
          href="#"
          className="inline-block border-b border-primary text-xs uppercase tracking-[0.2em] text-text hover:text-primary pb-1 transition-colors"
        >
          Discover the philosophy
        </a>
      </motion.div>
    </section>
  );
}
