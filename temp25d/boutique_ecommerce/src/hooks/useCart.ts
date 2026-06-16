import { useCartContext } from '@/context/CartContext';

export function useCart() {
  const { state, dispatch } = useCartContext();

  const open = () => dispatch({ type: 'OPEN_CART' });
  const close = () => dispatch({ type: 'CLOSE_CART' });
  const toggle = () => dispatch({ type: 'TOGGLE_CART' });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  const subtotal = state.items.reduce((sum, item) => sum + item.price, 0);

  return {
    isOpen: state.isOpen,
    items: state.items,
    open,
    close,
    toggle,
    removeItem,
    subtotal,
  };
}
