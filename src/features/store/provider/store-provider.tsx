'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { AppState, AppStoreApi, createAppStore } from '../store';

const AppStoreContext = createContext<AppStoreApi | null>(null);

export interface AppStoreProviderProps {
  initialState?: Partial<AppState>;
  children: React.ReactNode;
}

export function AppStoreProvider({ initialState, children }: AppStoreProviderProps) {
  const storeRef = useRef<AppStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createAppStore(initialState);
  }

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
}

export function useAppStore<T>(selector: (state: AppState) => T): T {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }

  return useStore(store, selector);
}
