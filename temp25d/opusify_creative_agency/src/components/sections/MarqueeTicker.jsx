import React from 'react';

const MarqueeTicker = ({ items = [] }) => {
  const renderTrackItems = () => {
    // Render items twice to ensure seamless looping coverage
    return [...items, ...items].map((item, index) => (
      <React.Fragment key={index}>
        <span className="font-heading font-bold text-4xl md:text-6xl mx-4 tracking-widest uppercase">
          {item}
        </span>
        <span className="text-primary text-4xl mx-4">✦</span>
      </React.Fragment>
    ));
  };

  return (
    <div className="relative flex overflow-x-hidden bg-secondary text-bg py-6 md:py-8 border-y-4 border-text transform -rotate-2 scale-105 my-20 shadow-2xl select-none">
      <div className="py-2 animate-marquee whitespace-nowrap flex items-center">
        {renderTrackItems()}
      </div>
      <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex items-center mt-6 md:mt-8">
        {renderTrackItems()}
      </div>
    </div>
  );
};

export default MarqueeTicker;
