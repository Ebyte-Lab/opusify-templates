import React from 'react';
import { bundleItems } from '../../data/bundles';
import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button';

export const BundleDeal: React.FC = () => {
  const { addItem, open } = useCart();

  const totalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddBundle = () => {
    bundleItems.forEach((item) => {
      addItem(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          img: item.img,
        },
        { silent: true }
      );
    });
    open();
  };

  return (
    <div className="bg-secondary p-4 md:p-6 rounded-sm border border-gray-200 shadow-sm">
      <h3 className="font-heading text-xl font-bold mb-4 text-text">
        Frequently bought together
      </h3>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Bundle Items */}
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 w-full md:w-auto">
          {bundleItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div
                className="w-24 h-24 flex-shrink-0 border border-gray-200 p-1 rounded hover:border-primary transition-colors cursor-pointer bg-white"
                title={item.name}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {idx < bundleItems.length - 1 && (
                <span className="text-gray-400 font-bold text-xl select-none">+</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bundle Total & Action */}
        <div className="flex flex-col items-start md:items-end w-full md:w-auto flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
          <div className="text-sm text-gray-600 mb-1">Total price:</div>
          <div className="text-xl font-bold text-priceAccent mb-3">
            ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <Button
            variant="bundle"
            onClick={handleAddBundle}
            className="w-full md:w-auto"
            aria-label="Add all three bundle items to cart"
          >
            Add all three to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BundleDeal;
