export type StockTag = 'IN STOCK' | 'PRE-ORDER' | 'LOW STOCK' | 'CYBER EDITION';

export interface Product {
  id: number;
  name: string;
  price: number;
  specs: string;
  img: string;
  tag: StockTag;
  category: 'laptops' | 'audio' | 'accessories' | 'components';
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface SpecGroup {
  id: string;
  title: string;
  rows: { label: string; value: string }[];
}

export interface Review {
  id: string;
  rating: number; // 1-5
  title: string;
  quote: string;
  userTag: string;
  verifiedTag: string;
}
