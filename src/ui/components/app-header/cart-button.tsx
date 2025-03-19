'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartDrawer } from '@/store/hooks/cart-drawer';
import { HeaderButton } from './header-button';

export function CartButton() {
  const { open } = useCartDrawer();

  return (
    <HeaderButton
      testId="shopping-cart-button"
      ariaLabel="פתחי את סל הקניות"
      Icon={ShoppingCartIcon}
      onClick={open}
    />
  );
}
