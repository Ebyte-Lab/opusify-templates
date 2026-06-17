import type { FC } from 'react';
import type { Product } from '../../data/products';

interface CartItemProps {
  item: Product;
  index: number;
  onRemove: (index: number) => void;
}

export const CartItem: FC<CartItemProps> = ({ item, index, onRemove }) => {
  return (
    <div className="flex gap-4 heavy-border p-2 bg-secondary/20">
      <div className="w-20 h-24 bg-secondary heavy-border flex-shrink-0">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between py-1 flex-1">
        <h4 className="font-heading text-xl leading-tight">{item.name}</h4>
        <div className="flex justify-between items-center w-full">
          <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-xs font-bold border-b border-text hover:text-primary hover:border-primary transition-colors uppercase focus:outline-none"
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
