'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ShoppingCartDrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ShoppingCartDrawerContext = createContext<ShoppingCartDrawerContextType | null>(null);

export interface ShoppingCartDrawerProviderProps {
  initialIsOpen?: boolean;
  children: ReactNode;
}

export function ShoppingCartDrawerProvider({
  initialIsOpen = false,
  children,
}: ShoppingCartDrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <ShoppingCartDrawerContext value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </ShoppingCartDrawerContext>
  );
}

export type UseShoppingCartDrawerReturn = ShoppingCartDrawerContextType;

export function useShoppingCartDrawer(): UseShoppingCartDrawerReturn {
  const context = useContext(ShoppingCartDrawerContext);

  if (!context) {
    throw new Error('useShoppingCartDrawer must be used within a ShoppingCartDrawerProvider');
  }

  return context;
}
