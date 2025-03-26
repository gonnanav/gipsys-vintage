'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartDrawer } from '@/ui/store';
import { HeaderButton } from './header-button';

export function CartButton() {
  const { open } = useCartDrawer();

  return <HeaderButton ariaLabel="פתחי את סל הקניות" Icon={ShoppingCartIcon} onClick={open} />;
}
