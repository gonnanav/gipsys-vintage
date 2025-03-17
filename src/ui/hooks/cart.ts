import { useAppStore } from '@/store/provider/store-provider';
import { Product } from '@/core/product';

interface UseCartReturn {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
}

export function useCart(): UseCartReturn {
  const items = useAppStore((state) => state.cartItems);
  const addItem = useAddItemToCart();
  const removeItem = useAppStore((state) => state.removeCartItem);

  return { items, addItem, removeItem };
}

type UseAddItemToCartReturn = (item: Product) => void;

export function useAddItemToCart(): UseAddItemToCartReturn {
  return useAppStore((state) => state.addCartItem);
}
