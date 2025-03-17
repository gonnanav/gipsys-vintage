import { createStore, StoreApi } from 'zustand/vanilla';
import { Product } from '@/core/product';

export type AppState = {
  cartItems: Product[];
};

export type AppActions = {
  addCartItem: (item: Product) => void;
  removeCartItem: (id: number) => void;
};

export type AppStore = AppState & AppActions;

const defaultInitialState: AppState = {
  cartItems: [],
};

export function createAppStore(initialState?: Partial<AppState>): StoreApi<AppStore> {
  return createStore<AppStore>()((set) => ({
    ...defaultInitialState,
    ...initialState,
    addCartItem: (item) => set((state) => addCartItem(state, item)),
    removeCartItem: (id) => set((state) => removeCartItem(state, id)),
  }));
}

function addCartItem(state: AppStore, item: Product): Partial<AppStore> {
  return {
    cartItems: [...state.cartItems, item],
  };
}

function removeCartItem(state: AppStore, id: number): Partial<AppStore> {
  return {
    cartItems: state.cartItems.filter((item) => item.id != id),
  };
}
