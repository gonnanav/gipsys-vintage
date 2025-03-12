import { useEffect, useRef } from 'react';
import { Product } from '@/core/product';
import { ShoppingCartContextType } from './shopping-cart-provider';

/**
 * Synchronizes the shopping cart with session storage.
 * Handles both loading from and saving to session storage.
 *
 * @param cartState The current cart state and methods to modify it
 * @param syncSessionStorage Whether to synchronize with session storage
 */
export function useSyncWithSessionStorage(
  { cart, setCart }: ShoppingCartContextType,
  syncSessionStorage: boolean,
) {
  const initialLoadCompleted = useLoadCartFromSessionStorage(setCart, syncSessionStorage);
  useSaveCartToSessionStorage({ cart, initialLoadCompleted, syncSessionStorage });
}

/**
 * Loads the cart from session storage on initial mount.
 *
 * @param setCart Function to update the cart state
 * @param syncSessionStorage Whether to synchronize with session storage
 * @returns Whether the initial load has been completed
 */
function useLoadCartFromSessionStorage(
  setCart: (cart: Product[]) => void,
  syncSessionStorage: boolean,
) {
  const initialLoadCompletedRef = useRef(false);

  useEffect(() => {
    if (initialLoadCompletedRef.current || !syncSessionStorage) return;

    const storageCartJson = sessionStorage.getItem('shoppingCart');
    const storageCart: Product[] = storageCartJson === null ? [] : JSON.parse(storageCartJson);

    setCart(storageCart);
    initialLoadCompletedRef.current = true;
  }, [setCart, syncSessionStorage]);

  return initialLoadCompletedRef.current;
}

interface SaveCartToSessionStorageProps {
  cart: Product[];
  initialLoadCompleted: boolean;
  syncSessionStorage: boolean;
}

/**
 * Saves the cart to session storage whenever it changes.
 * Only saves if the initial load has been completed and synchronization is enabled.
 */
function useSaveCartToSessionStorage({
  cart,
  initialLoadCompleted,
  syncSessionStorage,
}: SaveCartToSessionStorageProps) {
  const saveToStorage = initialLoadCompleted && syncSessionStorage;

  useEffect(() => {
    if (!saveToStorage) return;

    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart, saveToStorage]);
}
