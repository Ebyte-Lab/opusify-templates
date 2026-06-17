import React from 'react';
import { DeliveryFilter } from './DeliveryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { BrandFilter } from './BrandFilter';
import { RatingFilter } from './RatingFilter';
import { Button } from '../ui/Button';

interface FilterSidebarProps {
  freeShippingOnly: boolean;
  deliveryTomorrowOnly: boolean;
  maxPrice: number;
  selectedBrands: string[];
  minRating: number;
  onToggleFreeShipping: () => void;
  onToggleDeliveryTomorrow: () => void;
  onPriceChange: (value: number) => void;
  onToggleBrand: (brand: string) => void;
  onRatingSelect: (rating: number) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  freeShippingOnly,
  deliveryTomorrowOnly,
  maxPrice,
  selectedBrands,
  minRating,
  onToggleFreeShipping,
  onToggleDeliveryTomorrow,
  onPriceChange,
  onToggleBrand,
  onRatingSelect,
  onReset,
}) => {
  const isAnyFilterActive =
    freeShippingOnly ||
    deliveryTomorrowOnly ||
    maxPrice < 1000 ||
    selectedBrands.length > 0 ||
    minRating > 0;

  return (
    <aside className="w-64 hidden lg:block flex-shrink-0">
      <div className="bg-secondary p-4 rounded-sm border border-gray-200 shadow-sm sticky top-[130px]">
        <div className="flex items-center justify-between mb-3 border-b pb-2">
          <h3 className="font-bold text-base text-text">Filter Results</h3>
          {isAnyFilterActive && (
            <Button
              variant="text"
              onClick={onReset}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Clear All
            </Button>
          )}
        </div>

        <DeliveryFilter
          freeShippingOnly={freeShippingOnly}
          deliveryTomorrowOnly={deliveryTomorrowOnly}
          onToggleFreeShipping={onToggleFreeShipping}
          onToggleDeliveryTomorrow={onToggleDeliveryTomorrow}
        />

        <PriceRangeFilter
          maxPrice={maxPrice}
          onPriceChange={onPriceChange}
        />

        <BrandFilter
          selectedBrands={selectedBrands}
          onToggleBrand={onToggleBrand}
        />

        <RatingFilter
          minRating={minRating}
          onRatingSelect={onRatingSelect}
        />
      </div>
    </aside>
  );
};
export default FilterSidebar;
