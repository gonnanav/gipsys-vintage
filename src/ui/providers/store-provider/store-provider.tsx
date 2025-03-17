import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { AppStore, AppState, createAppStore } from '@/stores/app-store';

type AppStoreApi = ReturnType<typeof createAppStore>;

const AppStoreContext = createContext<AppStoreApi | null>(null);

export interface StoreProviderProps {
  children: React.ReactNode;
  initialState?: AppState;
}

export function AppStoreProvider({ initialState, children }: StoreProviderProps) {
  const storeRef = useRef<AppStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createAppStore(initialState);
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
}

export function useAppStore<T>(selector: (state: AppStore) => T): T {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return useStore(store, selector);
}
