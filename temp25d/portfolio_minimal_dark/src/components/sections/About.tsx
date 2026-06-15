// src/components/sections/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from '../ui/TerminalWindow';
import { aboutData } from '../../data/about';

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="w-full scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-center mb-10 select-none">
        <h2 className="font-heading text-2xl font-bold">About_Me</h2>
        <div className="h-px bg-secondary flex-grow ml-6"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <TerminalWindow title="guest@local: ~/about">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left/Main Column - Terminal Output */}
            <div className="md:col-span-2 space-y-6">
              {/* Bio Block */}
              <div className="space-y-3">
                <motion.div variants={itemVariants} className="flex select-none">
                  <span className="text-primary mr-2">guest@local:~/about$</span>
                  <span className="text-text">{aboutData.bioCommand}</span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="text-text/80 pl-3 border-l border-secondary/50 ml-2 space-y-4"
                >
                  {aboutData.bioParagraphs.map((para, i) => (
                    <p key={i} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </motion.div>
              </div>

              {/* Interests Block */}
              <div className="space-y-3">
                <motion.div variants={itemVariants} className="flex select-none">
                  <span className="text-primary mr-2">guest@local:~/about$</span>
                  <span className="text-text">{aboutData.interestsCommand}</span>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="text-text/80 pl-3 border-l border-secondary/50 ml-2 grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  {aboutData.interests.map((interest, i) => (
                    <span key={i} className="flex items-center gap-2 select-none">
                      <span className="text-primary font-semibold">drwxr-xr-x</span>
                      <span className="text-text/90">{interest}</span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Right Column - ASCII Art */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center md:justify-end font-mono text-[9px] sm:text-xs text-primary/70 leading-tight border border-secondary/35 p-4 rounded bg-[#070707] h-fit md:col-span-1"
            >
              <pre className="whitespace-pre select-text">{aboutData.avatarAscii}</pre>
            </motion.div>
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  );
};

export default About;
