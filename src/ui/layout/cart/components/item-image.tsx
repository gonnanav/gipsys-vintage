import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import { ListItemAvatar } from '@mui/material';
import { ProductImage, placeholderImage } from '@/core/product';

interface CartItemImageProps {
  image?: ProductImage;
}

export function CartItemImage({ image }: CartItemImageProps) {
  return (
    <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
      <Avatar variant="square" sx={{ position: 'relative' }}>
        <Image
          src={image?.src || placeholderImage.src}
          alt={image?.alt || placeholderImage.alt || ''}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Avatar>
    </ListItemAvatar>
  );
}
