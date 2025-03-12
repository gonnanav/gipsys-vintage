'use client';

import { createContext, useContext } from 'react';
import { Product } from '@/core/product';
import { useShoppingCartState } from './use-shopping-cart-state';
import { useSyncWithSessionStorage } from './use-sync-with-session-storage';

export interface ShoppingCartContextType {
  /** Current products in the shopping cart */
  cart: Product[];
  /**
   * Adds a product to the cart.
   * If the product is already in the cart, it won't be added again.
   */
  addProduct: (product: Product) => void;
  /**
   * Sets the cart to a new state.
   */
  setCart: (cart: Product[]) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export interface ShoppingCartProviderProps {
  children: React.ReactNode;
  /**
   * Initial products to populate the cart with.
   * Must not contain duplicate products (by id).
   * @default []
   */
  initialCart?: Product[];
  /**
   * Whether to synchronize the cart with session storage.
   * When true, the cart will be loaded from and saved to session storage.
   * @default false
   */
  syncSessionStorage?: boolean;
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
 *
 * @example
 * ```tsx
 * // With session storage synchronization
 * <ShoppingCartProvider syncSessionStorage={true}>
 *   <App />
 * </ShoppingCartProvider>
 * ```
 */
export function ShoppingCartProvider({
  children,
  initialCart = [],
  syncSessionStorage = false,
}: ShoppingCartProviderProps) {
  validateInitialCart(initialCart);

  const cartState = useShoppingCartState(initialCart);
  useSyncWithSessionStorage(cartState, syncSessionStorage);

  return <ShoppingCartContext value={cartState}>{children}</ShoppingCartContext>;
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
 *   const { cart, addProduct, setCart } = useShoppingCart();
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
