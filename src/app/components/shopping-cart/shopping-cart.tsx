'use client';

import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { ModalPortalRootContext } from '@/app/contexts';

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
        <ShoppingCartTitle />
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
