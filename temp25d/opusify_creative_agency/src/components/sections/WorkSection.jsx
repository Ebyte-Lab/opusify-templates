import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CaseStudyCard from '../ui/CaseStudyCard';
import { caseStudies } from '../../data/caseStudies';

const WorkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="work" className="container mx-auto px-6 md:px-10 lg:px-20 py-24">
      <h2 className="font-heading font-bold text-5xl md:text-7xl mb-16 uppercase border-b-2 border-text pb-6 inline-block select-none">
        Selected Work
      </h2>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
      >
        {caseStudies.map((caseStudy) => (
          <motion.div
            key={caseStudy.id}
            variants={itemVariants}
            className={`${caseStudy.colSpan} ${caseStudy.offsetClass || ''}`}
          >
            <CaseStudyCard caseStudy={caseStudy} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WorkSection;
