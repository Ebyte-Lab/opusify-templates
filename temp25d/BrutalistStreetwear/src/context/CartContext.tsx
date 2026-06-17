import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartState {
  cartItems: Product[];
  isCartOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number } // Remove by index in cart array
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

export interface CartContextType {
  cartItems: Product[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CART_STORAGE_KEY = 'opusify_stash_cart';

const initialCartState = (): CartState => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return {
      cartItems: saved ? JSON.parse(saved) : [],
      isCartOpen: false,
    };
  } catch (error) {
    console.error("Failed to parse cart items from localStorage", error);
    return {
      cartItems: [],
      isCartOpen: false,
    };
  }
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_ITEM': {
      const updated = state.cartItems.filter((_, idx) => idx !== action.payload);
      return {
        ...state,
        cartItems: updated,
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'OPEN_CART':
      return {
        ...state,
        isCartOpen: true,
      };
    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false,
      };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, null, initialCartState);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeFromCart = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const cartCount = state.cartItems.length;
  const cartTotal = state.cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        cartCount,
        cartTotal,
        isCartOpen: state.isCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
