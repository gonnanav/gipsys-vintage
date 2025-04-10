import Box from '@mui/material/Box';
import { Product } from '@/core/product';
import { DrawerLayout } from '@/ui/layout/drawer-layout';
import { CartList } from './list';
import { CartEmptyMessage } from './empty-message';

interface CartDrawerLayoutProps {
  cart: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (productId: number) => void;
}

export function CartDrawerLayout({ cart, onRemoveItem, isOpen, onClose }: CartDrawerLayoutProps) {
  return (
    <DrawerLayout
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
    </DrawerLayout>
  );
}
