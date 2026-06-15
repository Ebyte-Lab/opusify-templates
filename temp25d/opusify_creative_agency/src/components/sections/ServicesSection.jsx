import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../../data/caseStudies';

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="container mx-auto px-6 md:px-10 lg:px-20 py-24 border-t-2 border-text/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Heading */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit pr-4">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block font-body">
            Capabilities
          </span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] tracking-tight select-none">
            SERVICES <br />
            THAT <br />
            COMMUNICATE.
          </h2>
        </div>

        {/* Right Column - Service Items list */}
        <div className="lg:col-span-8 space-y-12">
          {servicesData.map((service, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group border-b border-text/20 pb-8 cursor-pointer relative"
              >
                {/* Number index */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-6 md:gap-10">
                    <span className="font-heading text-lg md:text-xl font-bold text-primary">
                      {service.id}
                    </span>
                    <div className="space-y-4">
                      <h3 className="font-heading text-2xl md:text-4xl font-extrabold tracking-tight group-hover:text-secondary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-text/70 font-body text-md md:text-lg max-w-xl leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  {/* Floating Chevron / Arrow */}
                  <motion.div
                    animate={{ rotate: isHovered ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-text group-hover:text-secondary"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Staggered features list (appears on hover) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isHovered ? 'auto' : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden mt-6 ml-12 md:ml-20"
                >
                  <div className="flex flex-wrap gap-3 pt-2">
                    {service.features.map((feature, fIndex) => (
                      <span
                        key={fIndex}
                        className="bg-secondary text-bg font-body text-xs md:text-sm font-semibold tracking-wider px-4 py-2 uppercase rounded-full select-none"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
