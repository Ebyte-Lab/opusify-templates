import React, { createContext, useReducer, useEffect, useMemo, type ReactNode } from 'react';
import type { CartItem } from '../../types/product';

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalPrice: number;
  totalCount: number;
  addItem: (item: { id: number; name: string; price: number; img: string }, opts?: { silent?: boolean }) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: { item: { id: number; name: string; price: number; img: string }; silent?: boolean } }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'TOGGLE_OPEN' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };
    case 'ADD_ITEM': {
      const { item, silent } = action.payload;
      const existingItemIndex = state.items.findIndex((i) => i.id === item.id);
      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        newItems = state.items.map((i, idx) =>
          idx === existingItemIndex ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...item, qty: 1 }];
      }

      return {
        ...state,
        items: newItems,
        isOpen: silent ? state.isOpen : true,
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'SET_OPEN':
      return {
        ...state,
        isOpen: action.payload,
      };
    case 'TOGGLE_OPEN':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('megamarket_cart');
      if (savedCart) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      }
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('megamarket_cart', JSON.stringify(state.items));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [state.items]);

  const addItem = (item: { id: number; name: string; price: number; img: string }, opts?: { silent?: boolean }) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, silent: opts?.silent } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const open = () => dispatch({ type: 'SET_OPEN', payload: true });
  const close = () => dispatch({ type: 'SET_OPEN', payload: false });
  const toggle = () => dispatch({ type: 'TOGGLE_OPEN' });

  const totalCount = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.qty, 0);
  }, [state.items]);

  const totalPrice = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [state.items]);

  const contextValue = useMemo<CartContextType>(() => ({
    items: state.items,
    isOpen: state.isOpen,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
    open,
    close,
    toggle,
  }), [state.items, state.isOpen, totalCount, totalPrice]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
