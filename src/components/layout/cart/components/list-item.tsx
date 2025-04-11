import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Product } from '@/core/product';
import { RemoveCartItemButton } from './remove-item-button';
import { CartItemImage } from './item-image';

export interface CartListItemProps {
  item: Product;
  removeFromCart: (itemId: number) => void;
}

export function CartListItem({ item, removeFromCart }: CartListItemProps) {
  const { id, name, price, images } = item;
  const handleRemove = () => removeFromCart(id);
  const priceString = `₪${price}`;
  const image = images?.[0];

  return (
    <ListItem secondaryAction={<RemoveCartItemButton onRemove={handleRemove} />}>
      <CartItemImage image={image} />
      <ListItemText primary={name} secondary={priceString} />
    </ListItem>
  );
}
