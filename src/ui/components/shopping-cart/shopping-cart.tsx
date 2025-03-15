'use client';

import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingCartDrawer } from '@/ui/components/shopping-cart-drawer/shopping-cart-drawer';
import {
  ShoppingCartDrawerProvider,
  useShoppingCartDrawer,
} from '@/ui/providers/shopping-cart-drawer/shopping-cart-drawer-provider';

export interface ShoppingCartProps {
  initialIsOpen?: boolean;
}

export function ShoppingCart({ initialIsOpen = false }: ShoppingCartProps = {}) {
  return (
    <ShoppingCartDrawerProvider initialIsOpen={initialIsOpen}>
      <ShoppingCartButton />
      <ShoppingCartDrawer />
    </ShoppingCartDrawerProvider>
  );
}

function ShoppingCartButton() {
  const { openDrawer } = useShoppingCartDrawer();

  return (
    <IconButton
      data-testid="shopping-cart-button"
      aria-label="פתחי את סל הקניות"
      onClick={openDrawer}
    >
      <ShoppingCartIcon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
}
