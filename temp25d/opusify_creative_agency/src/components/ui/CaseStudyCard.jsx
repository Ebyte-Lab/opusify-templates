import React from 'react';
import RevealCard from './RevealCard';

const CaseStudyCard = ({ caseStudy }) => {
  const {
    bgClass,
    minHeight,
    alignment,
    image,
    tag,
    tagColor,
    title,
    titleColor,
    borderClass,
    showArrow,
    centeredCard = false,
  } = caseStudy;

  // Determine size classes depending on whether they are defined in titleColor
  const sizeClass = titleColor.match(/text-[0-9a-z-]+/)
    ? ''
    : caseStudy.id === 2
      ? 'text-3xl'
      : 'text-4xl md:text-5xl';

  return (
    <RevealCard
      href="#"
      className={`w-full ${bgClass} ${minHeight} ${alignment} p-10 md:p-12`}
    >
      {showArrow && (
        <div className="reveal-content self-end text-bg mb-auto">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
      <img
        src={image.src}
        alt={image.alt}
        className={`reveal-image ${image.blendClass || ''}`}
      />
      {centeredCard ? (
        <div className="reveal-content bg-bg/90 p-8 transform group-hover:scale-105 transition-transform duration-300 w-full max-w-lg">
          <span className={`${tagColor} text-sm font-semibold tracking-widest uppercase mb-2 block`}>
            {tag}
          </span>
          <h3 className={`font-heading font-bold ${titleColor} ${sizeClass}`}>
            {title}
          </h3>
        </div>
      ) : (
        <div className={`reveal-content w-full ${borderClass || ''}`}>
          <span className={`${tagColor} text-sm font-semibold tracking-widest uppercase mb-2 block`}>
            {tag}
          </span>
          <h3 className={`font-heading font-bold ${titleColor} ${sizeClass} transition-colors duration-300`}>
            {title}
          </h3>
        </div>
      )}
    </RevealCard>
  );
};

export default CaseStudyCard;
