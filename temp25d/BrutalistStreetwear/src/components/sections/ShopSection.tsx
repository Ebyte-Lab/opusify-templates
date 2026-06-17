import { useState } from 'react';
import type { FC } from 'react';
import { PRODUCTS, EXTRA_PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';
import ProductCard from '../ui/ProductCard';

interface ShopSectionProps {
  onViewDetails: (product: Product) => void;
}

export const ShopSection: FC<ShopSectionProps> = ({ onViewDetails }) => {
  const [activeProducts, setActiveProducts] = useState<Product[]>(PRODUCTS);
  const [extraIndex, setExtraIndex] = useState(0);

  const handleLoadMore = () => {
    if (extraIndex < EXTRA_PRODUCTS.length) {
      // Append the next curated extra product
      setActiveProducts((prev) => [...prev, EXTRA_PRODUCTS[extraIndex]]);
      setExtraIndex((prev) => prev + 1);
    } else {
      // Generate a brand new streetwear product dynamically
      const id = activeProducts.length + 1;
      const names = [
        "GLITCH WIND-BREAKER",
        "NEON WASTELAND GLOVES",
        "CYBERNETIC DUST MASK",
        "CORRUPT DATA SWEATER",
        "SYNDICATE TECH SHELL",
        "SYSTEM OVERRIDE SLING"
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const name = `${randomName} [V.0${id}]`;
      const price = Math.floor(Math.random() * 120) + 45;
      const stocks = ["IN STOCK", "LOW STOCK", "PRE-ORDER"];
      const stock = stocks[Math.floor(Math.random() * stocks.length)];
      const img = `https://picsum.photos/seed/streetwear${id}/600/800`;
      
      const newProduct: Product = {
        id,
        name,
        price,
        img,
        stock,
        description: `Procedurally compiled technical apparel designed for full syndicate operations. Multi-pocket design, industrial durability.`,
        details: ["Dynamic System compilation", "Tactical grade synthetic fiber", "Oversized fit profile", "All Sales Final"]
      };

      setActiveProducts((prev) => [...prev, newProduct]);
    }
  };

  return (
    <section id="shop" className="w-full">
      <div className="bg-text text-bg p-4 heavy-border-b">
        <h2 className="font-heading text-4xl md:text-6xl">SHOP ALL [CAPSULE 004]</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {activeProducts.map((product, idx) => (
          <ProductCard 
            key={`${product.id}-${idx}`} 
            product={product} 
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      <div className="p-12 flex justify-center bg-bg heavy-border-b">
        <button
          type="button"
          onClick={handleLoadMore}
          className="bg-bg text-text hover:bg-text hover:text-bg transition-all duration-200 py-6 px-12 font-heading text-3xl md:text-4xl heavy-border brutal-hover focus:outline-none"
        >
          VIEW MORE HEAT
        </button>
      </div>
    </section>
  );
};

export default ShopSection;
