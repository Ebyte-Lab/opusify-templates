// src/components/sections/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import TerminalWindow from '../ui/TerminalWindow';
import SkillTag from '../ui/SkillTag';
import { skills } from '../../data/skills';
import { heroData } from '../../data/hero';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const taglineLines = heroData.tagline.split('\n');

  return (
    <section id="home" className="pt-8 w-full scroll-mt-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <TerminalWindow title="guest@local: ~">
          {/* Command: whoami */}
          <motion.div variants={itemVariants} className="flex select-none">
            <span className="text-primary mr-2">guest@local:~$</span>
            <span className="text-text">{heroData.whoamiCommand}</span>
          </motion.div>

          {/* Output: whoami */}
          <motion.div
            variants={itemVariants}
            className="text-text pb-4 pl-3 border-l border-secondary/50 ml-2 mt-2"
          >
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-3 mt-1 tracking-tight">
              {heroData.role}
            </h1>
            <p className="leading-relaxed text-text/80 max-w-2xl">
              {taglineLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < taglineLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </motion.div>

          {/* Command: cat current_status.txt */}
          <motion.div variants={itemVariants} className="flex pt-2 select-none">
            <span className="text-primary mr-2">guest@local:~$</span>
            <span className="text-text">{heroData.statusCommand}</span>
          </motion.div>

          {/* Output: cat current_status.txt */}
          <motion.div
            variants={itemVariants}
            className="text-text/80 grid grid-cols-2 sm:grid-cols-4 gap-3 pb-2 pl-3 border-l border-secondary/50 ml-2 mt-2"
          >
            {skills.map((skill) => (
              <SkillTag key={skill.name} name={skill.name} variant="terminal" />
            ))}
          </motion.div>

          {/* Prompt + Cursor */}
          <motion.div variants={itemVariants} className="flex mt-4 select-none">
            <span className="text-primary mr-2">guest@local:~$</span>
            <span 
              className="animate-pulse w-2 h-5 bg-text inline-block align-middle" 
              style={{ animationDuration: '1s' }}
              aria-hidden="true"
            />
          </motion.div>
        </TerminalWindow>
      </motion.div>
    </section>
  );
};

export default Hero;
