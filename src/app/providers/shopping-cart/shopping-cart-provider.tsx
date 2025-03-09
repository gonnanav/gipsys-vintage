'use client';

import { createContext, useContext, useState } from 'react';
import { Product } from '@/core/product';

interface ShoppingCartContextType {
  /** Current products in the shopping cart */
  cart: Product[];
  /**
   * Adds a product to the cart.
   * If the product is already in the cart, it won't be added again.
   */
  addProduct: (product: Product) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export interface ShoppingCartProviderProps {
  children: React.ReactNode;
  initialCart?: Product[];
}

/**
 * Provides shopping cart functionality to its children.
 * Manages the cart state and provides methods to modify it.
 *
 * @throws {Error} If initialCart contains duplicate products
 *
 * @example
 * ```tsx
 * <ShoppingCartProvider>
 *   <App />
 * </ShoppingCartProvider>
 * ```
 */
export function ShoppingCartProvider({ children, initialCart = [] }: ShoppingCartProviderProps) {
  validateInitialCart(initialCart);

  const [cart, setCart] = useState<Product[]>(initialCart);
  const addProduct = (product: Product) =>
    setCart((c) => {
      if (c.some((p) => p.id === product.id)) return c;

      return [...c, product];
    });

  return (
    <ShoppingCartContext.Provider value={{ cart, addProduct }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

/**
 * Return type of the useShoppingCart hook.
 * Contains the current cart state and methods to modify it.
 */
export type UseShoppingCartReturn = ShoppingCartContextType;

/**
 * Hook to access the shopping cart state and actions.
 * Must be used within a ShoppingCartProvider.
 *
 * @returns Current cart state and methods to modify it
 * @throws {Error} If used outside of ShoppingCartProvider
 *
 * @example
 * ```tsx
 * function ProductPage() {
 *   const { cart, addProduct } = useShoppingCart();
 *   // ...
 * }
 * ```
 */
export function useShoppingCart(): UseShoppingCartReturn {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }

  return context;
}

function validateInitialCart(initialCart: Product[]) {
  const idsSet = new Set(initialCart.map((p) => p.id));

  if (idsSet.size !== initialCart.length) {
    throw new Error('Initial cart contains duplicates');
  }
}
