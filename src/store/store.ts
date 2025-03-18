import { createStore, StoreApi } from 'zustand/vanilla';
import { Product } from '@/core/product';

export interface AppState {
  cartItems: Product[];
  addCartItem: (item: Product) => void;
  removeCartItem: (id: number) => void;

  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

export type AppStoreApi = StoreApi<AppState>;

export function createAppStore(initialState?: Partial<AppState>): AppStoreApi {
  return createStore<AppState>()((set) => ({
    cartItems: [],
    addCartItem: (item) => set((state) => addCartItem(state, item)),
    removeCartItem: (id) => set((state) => removeCartItem(state, id)),

    isCartDrawerOpen: false,
    openCartDrawer: () => set({ isCartDrawerOpen: true }),
    closeCartDrawer: () => set({ isCartDrawerOpen: false }),

    ...initialState,
  }));
}

function addCartItem(state: AppState, item: Product): Partial<AppState> {
  return {
    cartItems: [...state.cartItems, item],
    isCartDrawerOpen: true,
  };
}

function removeCartItem(state: AppState, id: number): Partial<AppState> {
  return {
    cartItems: state.cartItems.filter((item) => item.id != id),
  };
}
