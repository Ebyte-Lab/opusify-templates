// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  subPrice: number; // subscription price (~15% off)
  img: string;
  badges: string[];
}

export type PurchaseType = 'one-time' | 'sub';

export interface CartItem extends Product {
  cartItemId: string; // `${productId}-${purchaseType}` — unique per product+plan combo
  activePrice: number;
  isSub: boolean;
  qty: number;
}
