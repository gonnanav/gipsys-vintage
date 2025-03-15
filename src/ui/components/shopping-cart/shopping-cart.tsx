'use client';

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingCartDrawer } from '@/ui/components/shopping-cart-drawer/shopping-cart-drawer';

export interface ShoppingCartProps {
  initialIsOpen?: boolean;
}

export function ShoppingCart({ initialIsOpen = false }: ShoppingCartProps = {}) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ShoppingCartButton onClick={handleOpen} />
      <ShoppingCartDrawer isOpen={isOpen} onClose={handleClose} />
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
