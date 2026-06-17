import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { DeliveryFilter } from './DeliveryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { BrandFilter } from './BrandFilter';
import { RatingFilter } from './RatingFilter';
import { Button } from '../ui/Button';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
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

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
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
  useLockBodyScroll(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const isAnyFilterActive =
    freeShippingOnly ||
    deliveryTomorrowOnly ||
    maxPrice < 1000 ||
    selectedBrands.length > 0 ||
    minRating > 0;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-text/50 z-[60] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter Products Options"
        className={`fixed bottom-0 left-0 right-0 max-h-[85vh] bg-secondary z-[70] rounded-t-xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <h3 className="font-heading text-lg font-bold text-text">Filters</h3>
          <div className="flex items-center gap-4">
            {isAnyFilterActive && (
              <Button
                variant="text"
                onClick={onReset}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-gray-200 border-none bg-transparent shadow-none"
              aria-label="Close filters drawer"
            >
              <X size={24} />
            </Button>
          </div>
        </div>

        {/* Filters Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
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

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <Button variant="cta" onClick={onClose} fullWidth className="rounded-md py-3 text-sm font-bold shadow-sm">
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};
export default MobileFilterSheet;
