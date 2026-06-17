import { useState, useMemo, useEffect } from 'react';
import type { Product, ProductFilters } from '../types/product';

export function useProductFilters(initialProducts: Product[]) {
  const [filters, setFilters] = useState<Omit<ProductFilters, 'maxPrice'>>({
    freeShippingOnly: false,
    deliveryTomorrowOnly: false,
    brands: [],
    minRating: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Track slider value instantly for high-refresh label updates, but filter on debounced value
  const [priceSliderValue, setPriceSliderValue] = useState(500);
  const [debouncedPrice, setDebouncedPrice] = useState(500);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPrice(priceSliderValue);
    }, 150);
    return () => clearTimeout(handler);
  }, [priceSliderValue]);

  const setMaxPrice = (price: number) => {
    setPriceSliderValue(price);
  };

  const toggleFreeShipping = () => {
    setFilters((prev) => ({ ...prev, freeShippingOnly: !prev.freeShippingOnly }));
  };

  const toggleDeliveryTomorrow = () => {
    setFilters((prev) => ({ ...prev, deliveryTomorrowOnly: !prev.deliveryTomorrowOnly }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      const brands = exists
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands };
    });
  };

  const setMinRating = (rating: number) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  };

  const resetFilters = () => {
    setFilters({
      freeShippingOnly: false,
      deliveryTomorrowOnly: false,
      brands: [],
      minRating: 0,
    });
    setPriceSliderValue(500);
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Search Query (checks item name and brand)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      // 2. Department Category Match
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Electronics') {
          // Electronics maps to TechPro, AudioMax, Visionary
          if (product.brand !== 'TechPro' && product.brand !== 'AudioMax' && product.brand !== 'Visionary') {
            return false;
          }
        } else if (selectedCategory === 'Computers') {
          // Laptops, Mechanical Keyboards, Wireless Charging Pads, External Hard Drives (IDs: 1, 6, 7, 8)
          const comps = [1, 6, 7, 8];
          if (!comps.includes(product.id)) return false;
        } else if (selectedCategory === 'Home') {
          // Security Cameras, Office Chairs (IDs: 4, 5)
          const homeItems = [4, 5];
          if (!homeItems.includes(product.id)) return false;
        }
      }

      // 3. Price Limit
      if (product.price > debouncedPrice) {
        return false;
      }

      // 4. Free Shipping
      if (filters.freeShippingOnly && !product.freeShipping) {
        return false;
      }

      // 5. Get It By Tomorrow (Prime)
      if (filters.deliveryTomorrowOnly && !product.prime) {
        return false;
      }

      // 6. Brand Matches (OR logic)
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // 7. Minimum Rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      return true;
    });
  }, [initialProducts, filters, debouncedPrice, searchQuery, selectedCategory]);

  return {
    filters: {
      ...filters,
      maxPrice: priceSliderValue,
    },
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    setMaxPrice,
    toggleFreeShipping,
    toggleDeliveryTomorrow,
    toggleBrand,
    setMinRating,
    resetFilters,
    filteredProducts,
  };
}
