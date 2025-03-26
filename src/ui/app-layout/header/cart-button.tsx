'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartDrawerActions } from '@/ui/store';
import { HeaderButton } from './header-button';

export function CartButton() {
  const { open } = useCartDrawerActions();

  return <HeaderButton name="פתחי את סל הקניות" Icon={ShoppingCartIcon} onClick={open} />;
}
