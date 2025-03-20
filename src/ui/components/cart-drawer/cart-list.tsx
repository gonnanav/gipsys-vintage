import Image from 'next/image';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Avatar from '@mui/material/Avatar';
import { ListItemAvatar } from '@mui/material';
import { Product } from '@/core/product';

const placeholderImage = {
  src: '/images/product-placeholder.webp',
  alt: 'אין תמונת מוצר',
};

export interface CartListProps {
  cart: Product[];
  removeFromCart: (productId: number) => void;
}

export function CartList({ cart, removeFromCart }: CartListProps) {
  return (
    <List aria-label="פריטים בסל הקניות">
      {cart.map((product) => (
        <ListItem
          key={product.id}
          secondaryAction={
            <IconButton aria-label="הסירי מסל הקניות" onClick={() => removeFromCart(product.id)}>
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
