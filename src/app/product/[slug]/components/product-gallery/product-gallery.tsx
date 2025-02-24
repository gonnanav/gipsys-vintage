import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
  const hasThumbnails = hasImages && productImages.length > 1;

  return (
    <div data-testid="product-gallery">
      <MainImage productImage={mainImage} />
      {hasThumbnails && <Thumbnails productImages={productImages} />}
    </div>
  );
}

function MainImage({ productImage }: { productImage: ProductImage }) {
  const { src, alt = '' } = productImage;

  return (
    <Box
      data-testid="product-main-image"
      sx={{ position: 'relative', width: '100%', aspectRatio: '3 / 4' }}
    >
      <Image alt={alt} src={src} fill style={{ objectFit: 'contain' }} />
    </Box>
  );
}

interface ThumbnailsProps {
  productImages: ProductImage[];
}

function Thumbnails({ productImages }: ThumbnailsProps) {
  return (
    <Stack direction="row" spacing={{ xs: 2, sm: 3 }} data-testid="product-thumbnails">
      {productImages.map((productImage) => (
        <Thumbnail key={productImage.src} productImage={productImage} />
      ))}
    </Stack>
  );
}

interface ThumbnailProps {
  productImage: ProductImage;
}

function Thumbnail({ productImage }: ThumbnailProps) {
  const { src, alt } = productImage;

  return (
    <Box
      data-testid="product-thumbnail"
      sx={{ position: 'relative', width: '100px', aspectRatio: '1 / 1' }}
    >
      <Image alt={alt || ''} src={src} fill style={{ objectFit: 'contain' }} />
    </Box>
  );
}
