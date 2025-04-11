import { useAppStore } from '../provider/store-provider';
import { Product } from '@/core/product';

export interface UseCartActionsReturn {
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
}

export function useCartActions(): UseCartActionsReturn {
  const addItem = useAppStore((state) => state.addCartItem);
  const removeItem = useAppStore((state) => state.removeCartItem);

  return { addItem, removeItem };
}

export interface UseCartReturn extends UseCartActionsReturn {
  items: Product[];
}

export function useCart(): UseCartReturn {
  const items = useAppStore((state) => state.cartItems);
  const actions = useCartActions();

  return { items, ...actions };
}
