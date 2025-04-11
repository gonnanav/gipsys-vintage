'use client';

import { useCartDrawerActions } from '@/components/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { HeaderButton } from './header-button';

export function OpenCartButton() {
  const { open } = useCartDrawerActions();

  return <HeaderButton name="פתחי את סל הקניות" Icon={ShoppingCartIcon} onClick={open} />;
}
