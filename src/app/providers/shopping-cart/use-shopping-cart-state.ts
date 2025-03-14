import { useState } from 'react';
import { Product } from '@/core/product';
import { ShoppingCartContextType } from './shopping-cart-provider';

type ShoppingCartStateReturn = ShoppingCartContextType;

export function useShoppingCartState(initialCart: Product[]): ShoppingCartStateReturn {
  const [cart, setCart] = useState<Product[]>(initialCart);

  const addProduct = (product: Product) =>
    setCart((c) => {
      if (c.some((p) => p.id === product.id)) return c;

      return [...c, product];
    });

  const removeFromCart = (productId: number) => setCart((c) => c.filter((p) => p.id !== productId));

  return { cart, addProduct, setCart, removeFromCart };
}
