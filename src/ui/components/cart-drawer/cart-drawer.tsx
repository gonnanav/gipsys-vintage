'use client';

import { useContext } from 'react';
import Box from '@mui/material/Box';
import { useCart, useCartDrawer } from '@/store';
import { ModalPortalRootContext } from '@/ui/contexts/modal-portal-root-context';
import { CartList } from './cart-list';
import { CartEmptyMessage } from './cart-empty-message';
import { SideDrawerLayout } from '../side-drawer-layout';

export function CartDrawer() {
  const { items, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();
  const container = useContext(ModalPortalRootContext);

  return (
    <SideDrawerLayout
      title="סל הקניות"
      closeButtonName="סגרי את עגלת הקניות"
      drawerProps={{
        anchor: 'right',
        ModalProps: { container },
      }}
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
