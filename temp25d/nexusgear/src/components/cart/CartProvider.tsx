import React, { createContext, useReducer, useEffect } from 'react';
import type { CartItem, Product } from '../../types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QTY'; payload: { id: number; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' };

const CART_STORAGE_KEY = 'nexusgear_cart_items';

const initialState: CartState = {
  items: (() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })(),
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);
      let newItems;
      if (existingIndex > -1) {
        newItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            qty: 1,
          },
        ];
      }
      return { ...state, items: newItems };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, qty } : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty = (id: number, qty: number) =>
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const open = () => dispatch({ type: 'OPEN_CART' });
  const close = () => dispatch({ type: 'CLOSE_CART' });
  const toggle = () => dispatch({ type: 'TOGGLE_CART' });

  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalPrice,
        totalCount,
        isOpen: state.isOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
