export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;       // 0–5, supports .5 increments
  reviews: number;
  img: string;
  prime: boolean;
  brand: string;         // NEW — required for the brand filter to function
  freeShipping: boolean;  // NEW — distinct from `prime`, drives the "Free Shipping" checkbox
  bestSeller?: boolean;    // NEW — replaces the hardcoded `id === 1` check in the source
  inStock: boolean;        // NEW — replaces the hardcoded "In Stock" text in the source
  isDeal?: boolean;
  isNewRelease?: boolean;
  description?: string;
  specs?: string[];
}

export interface BundleItem {
  id: number;
  name: string;
  price: number;
  img: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  qty: number;
}

export interface ProductFilters {
  maxPrice: number;        // driven by the price slider, default 500
  freeShippingOnly: boolean;
  deliveryTomorrowOnly: boolean; // maps to `prime` as the closest available signal
  brands: string[];         // selected brand names, OR logic
  minRating: number;         // 0 = no filter, else 2/3/4
}

export interface DepartmentColumn {
  title: string;
  links: string[];
}
