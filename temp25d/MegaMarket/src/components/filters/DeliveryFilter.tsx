import React from 'react';

interface DeliveryFilterProps {
  freeShippingOnly: boolean;
  deliveryTomorrowOnly: boolean;
  onToggleFreeShipping: () => void;
  onToggleDeliveryTomorrow: () => void;
}

export const DeliveryFilter: React.FC<DeliveryFilterProps> = ({
  freeShippingOnly,
  deliveryTomorrowOnly,
  onToggleFreeShipping,
  onToggleDeliveryTomorrow,
}) => {
  return (
    <div className="mb-5">
      <h4 className="font-bold text-sm mb-2 text-text">Delivery Speed</h4>
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={deliveryTomorrowOnly}
            onChange={onToggleDeliveryTomorrow}
            className="accent-primary w-4 h-4 rounded focus:ring-primary focus:ring-2"
          />
          <span>Get It By Tomorrow</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={freeShippingOnly}
            onChange={onToggleFreeShipping}
            className="accent-primary w-4 h-4 rounded focus:ring-primary focus:ring-2"
          />
          <span>Free Shipping</span>
        </label>
      </div>
    </div>
  );
};
export default DeliveryFilter;
