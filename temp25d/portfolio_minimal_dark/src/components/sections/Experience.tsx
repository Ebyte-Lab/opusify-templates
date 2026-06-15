// src/components/sections/Experience.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../../data/experience';
import TimelineItem from '../ui/TimelineItem';

export const Experience: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="experience" className="w-full scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center mb-10 select-none">
        <h2 className="font-heading text-2xl font-bold">Execution_Trace</h2>
        <div className="h-px bg-secondary flex-grow ml-6"></div>
      </div>

      {/* Timeline Tree */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative border-l-2 border-secondary ml-3 md:ml-4 space-y-14 pb-4"
      >
        {experienceData.map((entry) => (
          <motion.div key={entry.id} variants={itemVariants}>
            <TimelineItem entry={entry} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Experience;
