'use client';

import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import { Product } from '@/core/product';
import { ModalPortalRootContext } from '@/app/contexts';
import { useShoppingCart } from '@/app/providers/shopping-cart/shopping-cart-provider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export interface ShoppingCartProps {
  initialIsOpen?: boolean;
}

export function ShoppingCart({ initialIsOpen = false }: ShoppingCartProps = {}) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const modalPortalRoot = useContext(ModalPortalRootContext);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ShoppingCartButton onClick={handleOpen} />
      <ShoppingCartModal isOpen={isOpen} onClose={handleClose} container={modalPortalRoot} />
    </>
  );
}

interface ShoppingCartButtonProps {
  onClick: () => void;
}

function ShoppingCartButton({ onClick }: ShoppingCartButtonProps) {
  return (
    <IconButton data-testid="shopping-cart-button" aria-label="פתחי את סל הקניות" onClick={onClick}>
      <ShoppingCartIcon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
}

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  container?: Element | null;
}

function ShoppingCartModal({ isOpen, onClose, container }: ShoppingCartModalProps) {
  const { cart } = useShoppingCart();

  return (
    <Drawer
      role="dialog"
      aria-modal="true"
      aria-label="סל הקניות"
      anchor="right"
      open={isOpen}
      onClose={onClose}
      data-testid="shopping-cart-modal"
      ModalProps={{ container }}
    >
      <Box sx={{ position: 'relative', px: 2, py: 1, width: { xs: '100vw', sm: '400px' } }}>
        <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
          <ShoppingCartCloseButton onClick={onClose} />
        </Box>
        <Box sx={{ mt: 0.5 }}>
          <ShoppingCartTitle />
        </Box>
        <Box>
          {cart.length ? (
            <Box sx={{ mt: 1 }}>
              <ShoppingCartList cart={cart} />
            </Box>
          ) : (
            <Box sx={{ mt: 5 }}>
              <ShoppingCartEmptyMessage />
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}

interface ShoppingCartCloseButtonProps {
  onClick: () => void;
}

function ShoppingCartCloseButton({ onClick }: ShoppingCartCloseButtonProps) {
  return (
    <IconButton
      aria-label="סגרי את עגלת הקניות"
      onClick={onClick}
      data-testid="shopping-cart-close-button"
    >
      <CloseIcon />
    </IconButton>
  );
}

function ShoppingCartTitle() {
  return (
    <Typography
      component="h2"
      variant="h6"
      data-testid="shopping-cart-title"
      sx={{ textAlign: 'center' }}
    >
      סל הקניות
    </Typography>
  );
}

interface ShoppingCartListProps {
  cart: Product[];
}

function ShoppingCartList({ cart }: ShoppingCartListProps) {
  return (
    <List aria-label="פריטים בסל הקניות">
      {cart.map((product) => (
        <ListItem key={product.id} data-testid="shopping-cart-item">
          <ListItemText primary={product.name} secondary={`₪${product.price}`} />
        </ListItem>
      ))}
    </List>
  );
}

function ShoppingCartEmptyMessage() {
  return (
    <Stack spacing={2} alignItems="center">
      <ShoppingCartIcon sx={{ fontSize: '3rem' }} />
      <Typography data-testid="shopping-cart-empty-message" sx={{ textAlign: 'center' }}>
        אין פריטים בסל
      </Typography>
    </Stack>
  );
}
