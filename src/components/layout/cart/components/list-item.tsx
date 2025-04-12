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
  const { id, name, formattedPrice, mainImage } = item;
  const handleRemove = () => removeFromCart(id);

  return (
    <ListItem secondaryAction={<RemoveCartItemButton onRemove={handleRemove} />}>
      <CartItemImage image={mainImage} />
      <ListItemText primary={name} secondary={formattedPrice} />
    </ListItem>
  );
}
