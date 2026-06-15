import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../../data/caseStudies';

const MobileMenu = ({ isOpen, onClose }) => {
  const menuVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
    exit:    { opacity: 0, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const linkVariants = {
    hidden:  { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="fixed inset-0 bg-secondary z-[60] flex flex-col justify-center items-center"
        >
          <motion.nav
            variants={containerVariants}
            className="flex flex-col space-y-8 text-center"
          >
            {navLinks.map((link, index) => (
              <motion.div key={index} variants={linkVariants}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="font-heading text-5xl md:text-7xl font-bold text-bg hover:text-primary transition-colors transform hover:scale-110 duration-300 block select-none"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
