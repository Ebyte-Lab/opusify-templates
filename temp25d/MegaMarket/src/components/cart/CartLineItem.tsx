import React from 'react';
import type { CartItem } from '../../types/product';
import { Button } from '../ui/Button';

interface CartLineItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
}

export const CartLineItem: React.FC<CartLineItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex gap-4 border-b border-gray-200 pb-4">
      <div className="w-20 h-20 bg-white border border-gray-200 p-1 rounded flex-shrink-0">
        <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col flex-1">
        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-1">
          {item.name}
        </h4>
        <div className="text-priceAccent font-bold text-base mb-2">
          ${item.price.toFixed(2)}
        </div>
        <div className="flex items-center justify-between mt-auto bg-gray-100 rounded-md p-1 w-fit border border-gray-300">
          <span className="text-xs px-2 text-gray-600">Qty: {item.qty}</span>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <Button
            variant="text"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartLineItem;
