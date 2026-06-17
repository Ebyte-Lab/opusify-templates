import React from 'react';
import { Menu } from 'lucide-react';
import { useMegaMenu } from '../../hooks/useMegaMenu';
import { departmentColumns, promoBlock } from '../../data/departments';

export const MegaMenu: React.FC = () => {
  const {
    isOpen,
    toggle,
    containerRef,
    triggerHandlers,
    menuHandlers,
  } = useMegaMenu();

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        {...triggerHandlers}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-1 hover:border-white border border-transparent px-2 py-1 rounded-sm font-bold tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-chromeDark"
      >
        <Menu size={20} />
        <span>Departments</span>
      </button>

      {isOpen && (
        <div
          {...menuHandlers}
          className="absolute top-full left-0 bg-white text-text shadow-xl border border-gray-200 grid grid-cols-4 w-[800px] z-[60] p-6 gap-8 rounded-b-md"
        >
          {departmentColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-heading font-bold text-base mb-3 border-b border-gray-200 pb-1 text-text">
                {column.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-0.5 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-gray-50 -my-6 -mr-6 p-6 flex flex-col items-center justify-center text-center rounded-br-md">
            <img
              src={promoBlock.img}
              alt="Promo"
              className="mb-4 shadow-md w-[150px] h-[150px] object-cover"
            />
            <h5 className="font-bold text-primary mb-1">{promoBlock.title}</h5>
            <p className="text-xs text-gray-500 mb-3">{promoBlock.description}</p>
            <a
              href={promoBlock.link}
              className="text-sm font-bold text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1 transition-colors"
            >
              {promoBlock.linkText}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
export default MegaMenu;
