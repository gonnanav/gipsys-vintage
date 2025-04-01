import Box from '@mui/material/Box';
import { CartList } from './cart-list';
import { CartEmptyMessage } from './cart-empty-message';
import { SideDrawerLayout } from '../side-drawer-layout';
import { Product } from '@/core/product';

export interface CartDrawerProps {
  cart: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (productId: number) => void;
}

export function CartDrawer({ cart, onRemoveItem, isOpen, onClose }: CartDrawerProps) {
  return (
    <SideDrawerLayout
      title="סל הקניות"
      closeButtonName="סגרי את עגלת הקניות"
      drawerProps={{ anchor: 'right' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Box>
        {cart.length ? (
          <Box sx={{ mt: 1 }}>
            <CartList cart={cart} removeFromCart={onRemoveItem} />
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
