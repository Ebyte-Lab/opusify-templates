import React from 'react';
import type { Product } from '../../types/product';
import { useCart } from '../../hooks/useCart';
import { StarRating } from '../ui/StarRating';
import { PriceTag } from '../ui/PriceTag';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useProductDetail } from '../product/ProductDetailProvider';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { openProductDetail } = useProductDetail();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    });
  };

  return (
    <div className="bg-secondary p-4 rounded-sm border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow relative">
      {product.bestSeller && (
        <Badge variant="best-seller" className="absolute top-0 left-0" />
      )}

      {/* Product Image */}
      <div
        onClick={() => openProductDetail(product)}
        className="w-full h-48 mb-4 p-2 cursor-pointer flex-shrink-0 flex items-center justify-center bg-white"
      >
        <img
          src={product.img}
          alt={product.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Product Name */}
      <h4
        onClick={() => openProductDetail(product)}
        className="text-sm font-medium text-blue-600 hover:text-orange-600 hover:underline cursor-pointer line-clamp-2 mb-1"
      >
        {product.name}
      </h4>

      {/* Ratings */}
      <div className="flex items-center gap-1.5 mb-2">
        <StarRating rating={product.rating} size={16} />
        <span className="text-xs text-blue-600 hover:underline cursor-pointer">
          {product.reviews.toLocaleString()}
        </span>
      </div>

      {/* Price */}
      <PriceTag price={product.price} size="xl" className="mb-1" />

      {/* Shipping Status */}
      <div className="mb-1">
        {product.prime ? (
          <Badge variant="prime" />
        ) : (
          <Badge variant="standard-shipping" />
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-4">
        {product.inStock ? (
          <span className="text-xs text-green-600 font-medium">In Stock</span>
        ) : (
          <span className="text-xs text-red-600 font-medium">Currently unavailable</span>
        )}
      </div>

      {/* Add To Cart */}
      <Button
        variant="cta"
        onClick={handleAddToCart}
        className="mt-auto w-full rounded-full py-2 shadow-sm font-bold text-sm"
        disabled={!product.inStock}
        aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is currently unavailable`}
      >
        {product.inStock ? 'Add to Cart' : 'Currently unavailable'}
      </Button>
    </div>
  );
};
export default ProductCard;
