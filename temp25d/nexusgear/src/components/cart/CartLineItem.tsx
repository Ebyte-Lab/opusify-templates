import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../../types/product';

interface CartLineItemProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
}

export const CartLineItem: React.FC<CartLineItemProps> = ({ item, onRemove, onUpdateQty }) => {
  return (
    <div className="border border-secondary p-4 flex justify-between items-center bg-secondary/10 group hover:border-primary/50 transition-colors">
      <div className="space-y-1">
        <div className="font-heading text-sm text-white group-hover:text-primary transition-colors">
          {item.name}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary">${item.price.toFixed(2)}</span>
          <span className="text-text/40 text-xs">|</span>
          <div className="flex items-center gap-2 bg-secondary/30 border border-secondary px-2 py-0.5">
            <button
              onClick={() => onUpdateQty(item.id, item.qty - 1)}
              className="text-text/60 hover:text-primary transition-colors focus:outline-none p-0.5"
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <Minus size={10} />
            </button>
            <span className="font-mono text-xs text-white min-w-[16px] text-center">{item.qty}</span>
            <button
              onClick={() => onUpdateQty(item.id, item.qty + 1)}
              className="text-text/60 hover:text-primary transition-colors focus:outline-none p-0.5"
              aria-label={`Increase quantity of ${item.name}`}
            >
              <Plus size={10} />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-text/40 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded outline-none p-1 transition-colors"
        aria-label={`Remove ${item.name} from cart`}
      >
        <X size={16} />
      </button>
    </div>
  );
};
