'use client';

import { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
      <IconButton
        data-testid="shopping-cart-button"
        aria-label="פתחי את סל הקניות"
        onClick={handleOpen}
      >
        <ShoppingCartIcon sx={{ color: 'primary.main' }} />
      </IconButton>
      <Drawer
        role="dialog"
        aria-modal="true"
        aria-label="סל הקניות"
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        data-testid="shopping-cart-modal"
        ModalProps={{ container: modalPortalRoot }}
        sx={{ textAlign: 'center' }}
      >
        <Box sx={{ position: 'relative', px: 2, py: 1, width: { xs: '100vw', sm: '400px' } }}>
          <IconButton
            aria-label="סגרי את עגלת הקניות"
            onClick={handleClose}
            data-testid="shopping-cart-close-button"
            sx={{ position: 'absolute', top: 5, right: 5 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography component="h2" variant="h6" data-testid="shopping-cart-title">
            סל הקניות
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
