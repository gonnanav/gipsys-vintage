import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import { ListItemAvatar } from '@mui/material';
import { ProductImage } from '@/core/product';

interface CartItemImageProps {
  image: ProductImage;
}

export function CartItemImage({ image }: CartItemImageProps) {
  const { src, alt } = image;

  return (
    <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
      <Avatar variant="square" sx={{ position: 'relative' }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      </Avatar>
    </ListItemAvatar>
  );
}
