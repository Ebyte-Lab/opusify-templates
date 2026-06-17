import React from 'react';
import type { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';
import { usePurchaseType } from '../../hooks/usePurchaseType';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PurchaseToggle } from './PurchaseToggle';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { purchaseType, activePrice, priceLabel, setPurchaseType } = usePurchaseType(product);

  const handleAddToBasket = () => {
    addItem(product, purchaseType);
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-secondary/10 flex flex-col justify-between hover:shadow-float transition-all duration-300">
      <div>
        {/* Photo Container */}
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-square bg-secondary/10">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h3 className="font-heading text-2xl mb-2 text-text">{product.name}</h3>
        <p className="text-text/60 text-sm mb-6">{product.desc}</p>

        {/* Toggle */}
        <PurchaseToggle purchaseType={purchaseType} onChange={setPurchaseType} />
      </div>

      <div>
        {/* Price display */}
        <div className="flex justify-between items-baseline mb-6 border-t border-secondary/20 pt-6">
          <span className="text-[10px] text-text/50 uppercase font-bold tracking-wider">
            {priceLabel}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-3xl font-semibold text-primary">
              ${activePrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button onClick={handleAddToBasket} fullWidth className="py-4">
          Add to Basket
        </Button>
      </div>
    </div>
  );
};
