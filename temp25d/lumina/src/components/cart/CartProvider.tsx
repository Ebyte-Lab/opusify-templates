import React, { createContext, useReducer, useEffect } from 'react';
import type { Product, CartItem, PurchaseType } from '../../types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; purchaseType: PurchaseType } }
  | { type: 'REMOVE_ITEM'; payload: string } // cartItemId
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, type: PurchaseType) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  totalPrice: number;
  totalCount: number;
}

export const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = 'lumina_cart_items';

const getInitialState = (): CartState => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return {
      items: saved ? JSON.parse(saved) : [],
      isOpen: false,
    };
  } catch {
    return {
      items: [],
      isOpen: false,
    };
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, purchaseType } = action.payload;
      const cartItemId = `${product.id}-${purchaseType}`;
      const isSub = purchaseType === 'sub';
      const activePrice = isSub ? product.subPrice : product.price;

      const existingIndex = state.items.findIndex((item) => item.cartItemId === cartItemId);
      let newItems = [...state.items];

      if (existingIndex > -1) {
        // Increment qty
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          qty: newItems[existingIndex].qty + 1,
        };
      } else {
        // Add new item
        newItems.push({
          ...product,
          cartItemId,
          activePrice,
          isSub,
          qty: 1,
        });
      }

      return {
        ...state,
        items: newItems,
        isOpen: true, // Automatically open cart drawer on add
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.cartItemId !== action.payload),
      };
    }
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, type: PurchaseType) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, purchaseType: type } });
  };

  const removeItem = (cartItemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartItemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const open = () => dispatch({ type: 'OPEN_CART' });
  const close = () => dispatch({ type: 'CLOSE_CART' });
  const toggle = () => dispatch({ type: 'TOGGLE_CART' });

  const totalPrice = state.items.reduce((sum, item) => sum + item.activePrice * item.qty, 0);
  const totalCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        clearCart,
        open,
        close,
        toggle,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
