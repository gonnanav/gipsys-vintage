import Image from 'next/image';
import Box from '@mui/material/Box';
import { ProductImage } from '@/application';

const placeholderImage: ProductImage = {
  src: '/placeholder.webp',
  alt: 'אין תמונת מוצר',
};

interface ProductGalleryProps {
  productImages?: ProductImage[];
}

export function ProductGallery({ productImages }: ProductGalleryProps) {
  const hasImages = productImages && productImages.length > 0;
  const mainImage = hasImages ? productImages[0] : placeholderImage;
  const { src, alt = '' } = mainImage;

  return (
    <Box
      data-testid="product-gallery"
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3 / 4',
      }}
    >
      <Image alt={alt} src={src} fill style={{ objectFit: 'contain' }} />
    </Box>
  );
}
