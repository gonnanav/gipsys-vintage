'use client';

import { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useCart, useCartDrawer } from '@/store';
import { ModalPortalRootContext } from '@/ui/contexts/modal-portal-root-context';
import { CartCloseButton } from './cart-close-button';
import { CartTitle } from './cart-title';
import { CartList } from './cart-list';
import { CartEmptyMessage } from './cart-empty-message';

export function CartDrawer() {
  const { items, removeItem } = useCart();
  const { isOpen, close } = useCartDrawer();
  const container = useContext(ModalPortalRootContext);

  return (
    <Drawer
      role="dialog"
      aria-modal="true"
      aria-label="סל הקניות"
      anchor="right"
      open={isOpen}
      onClose={close}
      data-testid="shopping-cart-modal"
      ModalProps={{ container }}
    >
      <Box sx={{ position: 'relative', px: 2, py: 1, width: { xs: '100vw', sm: '400px' } }}>
        <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
          <CartCloseButton onClick={close} />
        </Box>
        <Box sx={{ mt: 0.5 }}>
          <CartTitle />
        </Box>
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
      </Box>
    </Drawer>
  );
}
