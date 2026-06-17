import React from 'react';
import { products } from '../../data/products';

interface FilterParams {
  category: string | null;
  inStockOnly: boolean;
  cyberEditionOnly: boolean;
  refurbishedOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterParams;
  onChangeFilters: (filters: FilterParams) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChangeFilters }) => {
  // Calculate live product counts per category from canonical products list
  const getCategoryCount = (cat: 'laptops' | 'audio' | 'accessories' | 'components') => {
    return products.filter((p) => p.category === cat).length;
  };

  const handleCategorySelect = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    onChangeFilters({
      ...filters,
      category: filters.category === category ? null : category,
    });
  };

  const handleCheckboxChange = (field: 'inStockOnly' | 'cyberEditionOnly' | 'refurbishedOnly') => {
    onChangeFilters({
      ...filters,
      [field]: !filters[field],
    });
  };

  const categories = [
    { id: 'laptops', label: 'Laptops' },
    { id: 'audio', label: 'Audio' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'components', label: 'Components' },
  ] as const;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-28 space-y-8 select-none">
      {/* Categories Filter */}
      <div>
        <h3 className="font-heading text-lg text-white mb-4 border-b border-secondary pb-2">CATEGORIES</h3>
        <ul className="space-y-2 font-mono text-sm">
          {categories.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  onClick={(e) => handleCategorySelect(e, cat.id)}
                  className={`flex justify-between items-center py-1 group focus-visible:ring-2 focus-visible:ring-primary rounded outline-none transition-all duration-300 ${
                    isActive ? 'text-primary pl-2' : 'text-text hover:text-white hover:pl-2'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {isActive ? <span className="neon-text">&gt; {cat.label}</span> : `> ${cat.label}`}
                  </span>
                  <span className="text-xs text-text/40">
                    [{String(getCategoryCount(cat.id)).padStart(2, '0')}]
                  </span>
                </a>
              </li>
            );
          })}
          {filters.category && (
            <li className="pt-2">
              <button
                onClick={() => onChangeFilters({ ...filters, category: null })}
                className="text-xs text-primary/60 hover:text-primary transition-colors font-mono uppercase focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
              >
                [Clear Category Filter]
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Checkbox Filters */}
      <div>
        <h3 className="font-heading text-lg text-white mb-4 border-b border-secondary pb-2">FILTER_PARAMETERS</h3>
        <div className="space-y-4">
          {/* In Stock Only */}
          <label className="flex items-center gap-3 cursor-pointer group focus-within:ring-2 focus-within:ring-primary rounded outline-none p-1">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={() => handleCheckboxChange('inStockOnly')}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${
                filters.inStockOnly ? 'border-primary' : 'border-secondary group-hover:border-primary'
              }`}
            >
              {filters.inStockOnly && <div className="w-2 h-2 bg-primary"></div>}
            </div>
            <span className="text-sm font-mono text-text/80 group-hover:text-white transition-colors">
              In Stock Only
            </span>
          </label>

          {/* Cyber Edition */}
          <label className="flex items-center gap-3 cursor-pointer group focus-within:ring-2 focus-within:ring-primary rounded outline-none p-1">
            <input
              type="checkbox"
              checked={filters.cyberEditionOnly}
              onChange={() => handleCheckboxChange('cyberEditionOnly')}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${
                filters.cyberEditionOnly ? 'border-primary' : 'border-secondary group-hover:border-primary'
              }`}
            >
              {filters.cyberEditionOnly && <div className="w-2 h-2 bg-primary"></div>}
            </div>
            <span className="text-sm font-mono text-text/80 group-hover:text-white transition-colors">
              Cyber Edition
            </span>
          </label>

          {/* Refurbished */}
          <label className="flex items-center gap-3 cursor-pointer group focus-within:ring-2 focus-within:ring-primary rounded outline-none p-1">
            <input
              type="checkbox"
              checked={filters.refurbishedOnly}
              onChange={() => handleCheckboxChange('refurbishedOnly')}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${
                filters.refurbishedOnly ? 'border-primary' : 'border-secondary group-hover:border-primary'
              }`}
            >
              {filters.refurbishedOnly && <div className="w-2 h-2 bg-primary"></div>}
            </div>
            <span className="text-sm font-mono text-text/80 group-hover:text-white transition-colors">
              Refurbished
            </span>
          </label>
        </div>
      </div>
    </aside>
  );
};
