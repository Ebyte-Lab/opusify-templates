import { CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-6 group">
      {/* Image Container */}
      <div className="w-24 h-32 overflow-hidden bg-secondary flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details Container */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-heading text-sm uppercase tracking-wider mb-1 text-text">
            {item.name}
          </h3>
          <p className="text-xs text-text/50 font-light tracking-wide">
            {item.meta}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm tracking-widest font-light text-text">
            ${item.price.toLocaleString()}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="text-[10px] uppercase tracking-widest text-text/50 border-b border-text/20 hover:text-primary hover:border-primary transition-colors pb-0.5 focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
