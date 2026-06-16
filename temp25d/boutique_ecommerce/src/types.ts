export interface CartItemType {
  id: number;
  image: string;
  name: string;
  meta: string;
  price: number;
}

export interface FeatureType {
  id: number;
  reverse: boolean;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
}

export interface LookbookSlideType {
  id: number;
  image: string;
  label: string;
  city: string;
  description?: string;
  items?: string[];
}

export interface LinkItemType {
  label: string;
  href: string;
}

export interface CartState {
  isOpen: boolean;
  items: CartItemType[];
}

export type CartAction =
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_ITEMS'; payload: CartItemType[] }
  | { type: 'REMOVE_ITEM'; payload: number };
