import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const heroContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 } },
};

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-text">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://picsum.photos/seed/atelierhero/1920/1080"
          alt="Spring Collection Video Campaign"
          className="w-full h-full object-cover opacity-80 animate-kenBurns grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text/60 via-transparent to-text/30" />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={heroContentVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 mt-16"
      >
        <span className="text-bg/80 text-xs tracking-[0.3em] uppercase mb-4 font-light drop-shadow-md">
          Spring / Summer 2026
        </span>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-bg uppercase tracking-widest mb-10 drop-shadow-lg font-light leading-tight">
          The Art of<br />Restraint
        </h1>

        {/* Play Button */}
        <button className="group flex flex-col items-center gap-4 text-bg hover:text-primary transition-colors duration-500 focus:outline-none">
          <div className="w-16 h-16 rounded-full border border-bg/40 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-500 backdrop-blur-sm bg-bg/5">
            <Play size={20} fill="currentColor" stroke="none" className="ml-1" />
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-light">
            Watch Campaign
          </span>
        </button>
      </motion.div>
    </section>
  );
}
