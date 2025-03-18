'use client';

import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingCartDrawer } from '@/ui/components/shopping-cart-drawer/shopping-cart-drawer';
import { useCartDrawer } from '@/store';

export interface ShoppingCartProps {
  initialIsOpen?: boolean;
}

export function ShoppingCart() {
  return (
    <>
      <ShoppingCartButton />
      <ShoppingCartDrawer />
    </>
  );
}

function ShoppingCartButton() {
  const { open } = useCartDrawer();

  return (
    <IconButton data-testid="shopping-cart-button" aria-label="פתחי את סל הקניות" onClick={open}>
      <ShoppingCartIcon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
}
