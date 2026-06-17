import React from 'react';
import CountdownTimer from '../ui/CountdownTimer';

interface HeroSectionProps {
  targetDate: Date;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ targetDate }) => {
  return (
    <section
      id="latest"
      className="relative w-full h-[80vh] bg-secondary flex flex-col heavy-border-b overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-luminosity">
        <img
          src="https://picsum.photos/seed/streetwearhero/1920/1080"
          alt="Latest Campaign"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Halftone pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20 z-0 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4=")`
        }}
      />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="bg-primary text-bg font-bold px-4 py-1 mb-6 transform -rotate-2 heavy-border select-none">
          CAPSULE 004
        </div>
        <h1 className="font-heading text-7xl md:text-[10rem] leading-none text-text drop-shadow-[4px_4px_0_#FF0000] mb-8 select-none">
          TOXIC <br />
          <span 
            className="text-transparent" 
            style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
          >
            WASTELAND
          </span>
        </h1>
        
        {/* Countdown */}
        <CountdownTimer targetDate={targetDate} />
      </div>
    </section>
  );
};

export default HeroSection;
