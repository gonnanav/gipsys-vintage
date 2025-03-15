'use client';

import { useContext } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Avatar from '@mui/material/Avatar';
import { Product, ProductImage } from '@/core/product';
import { ModalPortalRootContext } from '@/ui/contexts/modal-portal-root-context';
import { useShoppingCart } from '@/ui/providers/shopping-cart/shopping-cart-provider';
import { ListItemAvatar } from '@mui/material';

const placeholderImage: ProductImage = {
  src: '/images/product-placeholder.webp',
  alt: 'אין תמונת מוצר',
};

export interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCartDrawer({ isOpen, onClose }: ShoppingCartDrawerProps) {
  const { cart, removeFromCart } = useShoppingCart();
  const container = useContext(ModalPortalRootContext);

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
              <ShoppingCartList cart={cart} removeFromCart={removeFromCart} />
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
  removeFromCart: (productId: number) => void;
}

function ShoppingCartList({ cart, removeFromCart }: ShoppingCartListProps) {
  return (
    <List aria-label="פריטים בסל הקניות">
      {cart.map((product) => (
        <ListItem
          key={product.id}
          data-testid="shopping-cart-item"
          secondaryAction={
            <IconButton
              data-testid="shopping-cart-item-remove-button"
              aria-label="הסירי מסל הקניות"
              onClick={() => removeFromCart(product.id)}
            >
              <HighlightOffIcon />
            </IconButton>
          }
        >
          <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar variant="square" sx={{ position: 'relative' }}>
              <Image
                src={product.images?.[0]?.src || placeholderImage.src}
                alt={product.images?.[0]?.alt || placeholderImage.alt || ''}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Avatar>
          </ListItemAvatar>
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
      <Typography sx={{ textAlign: 'center' }}>אין פריטים בסל</Typography>
    </Stack>
  );
}
