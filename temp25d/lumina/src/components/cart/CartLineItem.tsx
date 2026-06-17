import React from 'react';
import { X } from 'lucide-react';
import type { CartItem } from '../../types/product';
import { IconButton } from '../ui/IconButton';

interface CartLineItemProps {
  item: CartItem;
  onRemove: (cartItemId: string) => void;
}

export const CartLineItem: React.FC<CartLineItemProps> = ({ item, onRemove }) => {
  const lineTotal = item.activePrice * item.qty;

  return (
    <div className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-secondary/20">
      <div className="w-20 h-20 bg-secondary/20 rounded-xl overflow-hidden flex-shrink-0">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-heading text-text font-medium leading-tight pr-2">{item.name}</h4>
            <IconButton
              onClick={() => onRemove(item.cartItemId)}
              aria-label={`Remove ${item.name} (${item.isSub ? 'Subscription' : 'One-time'}) from basket`}
              className="text-text/30 hover:text-red-400 p-1"
            >
              <X className="w-[18px] h-[18px]" />
            </IconButton>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block mt-1">
            {item.isSub ? 'Subscription' : 'One-time'}
          </span>
        </div>
        <div className="flex justify-between items-end mt-2">
          <span className="text-text/60 text-sm">Qty: {item.qty}</span>
          <span className="font-heading font-semibold text-primary">${lineTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
