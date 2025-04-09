'use client';

import { useCart, useCartDrawer } from '@/ui/store';
import { CartDrawerLayout } from './cart-drawer-layout';

export function CartDrawer() {
  const { items, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();

  return (
    <CartDrawerLayout cart={items} onRemoveItem={removeItem} isOpen={isOpen} onClose={close} />
  );
}
