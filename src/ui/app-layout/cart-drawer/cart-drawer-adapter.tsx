'use client';

import { useCart, useCartDrawer } from '@/ui/store';
import { CartDrawer } from './cart-drawer';

export function CartDrawerAdapter() {
  const { items, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();

  return <CartDrawer cart={items} onRemoveItem={removeItem} isOpen={isOpen} onClose={close} />;
}
