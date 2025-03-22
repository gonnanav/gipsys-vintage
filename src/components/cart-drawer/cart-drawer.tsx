'use client';

import Box from '@mui/material/Box';
import { useCart, useCartDrawer } from '@/store';
import { CartList } from './cart-list';
import { CartEmptyMessage } from './cart-empty-message';
import { SideDrawerLayout } from '../side-drawer-layout';

export function CartDrawer() {
  const { items, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();

  return (
    <SideDrawerLayout
      title="סל הקניות"
      closeButtonName="סגרי את עגלת הקניות"
      drawerProps={{ anchor: 'right' }}
      isOpen={isOpen}
      onClose={close}
    >
      <Box>
        {items.length ? (
          <Box sx={{ mt: 1 }}>
            <CartList cart={items} removeFromCart={removeItem} />
          </Box>
        ) : (
          <Box sx={{ mt: 5 }}>
            <CartEmptyMessage />
          </Box>
        )}
      </Box>
    </SideDrawerLayout>
  );
}
