import React from 'react';

interface PriceRangeFilterProps {
  maxPrice: number;
  onPriceChange: (value: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  maxPrice,
  onPriceChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(Number(e.target.value));
  };

  return (
    <div className="mb-5 border-t border-gray-200 pt-4">
      <h4 className="font-bold text-sm mb-2 text-text">Price</h4>
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>$0</span>
        <span>$1,000+</span>
      </div>
      <input
        type="range"
        min="0"
        max="1000"
        value={maxPrice}
        onChange={handleChange}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Filter products by maximum price"
      />
      <div className="mt-2 text-sm text-gray-700 font-medium">
        Under $<span>{maxPrice}</span>
      </div>
    </div>
  );
};
export default PriceRangeFilter;
