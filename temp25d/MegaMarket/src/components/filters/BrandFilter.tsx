import React from 'react';

interface BrandFilterProps {
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
}

const BRANDS = ['TechPro', 'AudioMax', 'Visionary', 'HomeEssentials'];

export const BrandFilter: React.FC<BrandFilterProps> = ({
  selectedBrands,
  onToggleBrand,
}) => {
  return (
    <div className="mb-5 border-t border-gray-200 pt-4">
      <h4 className="font-bold text-sm mb-2 text-text">Brand</h4>
      <div className="space-y-1.5">
        {BRANDS.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
              className="accent-primary w-4 h-4 rounded focus:ring-primary focus:ring-2"
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default BrandFilter;
