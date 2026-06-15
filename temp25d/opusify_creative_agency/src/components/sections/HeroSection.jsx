import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
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
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-6 md:px-10 lg:px-20 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Large Typography */}
          <div className="md:col-span-8 z-20">
            <motion.h1
              variants={itemVariants}
              className="font-heading font-extrabold text-6xl sm:text-7xl md:text-9xl leading-[0.85] tracking-tight text-text mix-blend-exclusion select-none"
            >
              WE BUILD <br />
              <span className="text-primary italic">LOUD</span> <br />
              DIGITAL <br />
              REALITIES.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-8 text-lg md:text-xl font-medium max-w-md mix-blend-exclusion font-body"
            >
              A creative agency specialized in avant-garde design, motion effects, and unapologetic branding.
            </motion.p>
          </div>

          {/* Asymmetric Parallax Image */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 relative mt-12 md:mt-0 z-10 md:-ml-24 transform hover:-translate-y-4 transition-transform duration-700"
          >
            <div className="aspect-[3/4] overflow-hidden bg-secondary w-full max-w-sm ml-auto relative">
              <img
                src="https://picsum.photos/seed/avantgarde/600/800"
                alt="Avant-garde design showcase"
                className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-500 scale-105"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary rounded-full mix-blend-multiply animate-pulse pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
