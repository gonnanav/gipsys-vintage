'use client';

import { useCartDrawerActions } from '@/ui/store';
import { CartButton } from './cart-button';

export function CartButtonAdapter() {
  const { open } = useCartDrawerActions();

  return <CartButton onClick={open} />;
}
