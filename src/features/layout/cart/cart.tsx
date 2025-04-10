'use client';

import { useCart, useCartDrawer } from '@/features/store';
import { CartDrawerLayout } from './components/drawer-layout';

export function CartDrawer() {
  const { items, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();

  return (
    <CartDrawerLayout cart={items} onRemoveItem={removeItem} isOpen={isOpen} onClose={close} />
  );
}
