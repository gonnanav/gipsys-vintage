import { List } from '@mui/material';
import { Product } from '@/core/product';
import { CartListItem } from './list-item';

export interface CartListProps {
  cart: Product[];
  removeFromCart: (productId: number) => void;
}

export function CartList({ cart, removeFromCart }: CartListProps) {
  return (
    <List aria-label="פריטים בסל הקניות">
      {cart.map((item) => (
        <CartListItem key={item.id} item={item} removeFromCart={removeFromCart} />
      ))}
    </List>
  );
}
