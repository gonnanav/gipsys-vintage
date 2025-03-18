'use client';

import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartDrawer } from '@/store/hooks/cart-drawer';

export function CartButton() {
  const { open } = useCartDrawer();

  return (
    <IconButton data-testid="shopping-cart-button" aria-label="פתחי את סל הקניות" onClick={open}>
      <ShoppingCartIcon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
}
