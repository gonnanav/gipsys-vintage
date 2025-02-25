import Image from 'next/image';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ProductImage } from '@/application';

const placeholderImage: ProductImage = {
  src: '/images/product-placeholder.webp',
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
    <Box data-testid="product-gallery" sx={{ width: '100%' }}>
      <MainImage productImage={mainImage} />
      {hasThumbnails && <Thumbnails productImages={productImages} />}
    </Box>
  );
}

function MainImage({ productImage }: { productImage: ProductImage }) {
  const { src, alt = '' } = productImage;

  return (
    <Box
      data-testid="product-main-image"
      sx={{ position: 'relative', width: '100%', aspectRatio: '3 / 4' }}
    >
      <Image alt={alt} src={src} fill style={{ objectFit: 'cover' }} />
    </Box>
  );
}

interface ThumbnailsProps {
  productImages: ProductImage[];
}

function Thumbnails({ productImages }: ThumbnailsProps) {
  return (
    <ImageList data-testid="product-thumbnails" cols={3} gap={8}>
      {productImages.map((productImage) => (
        <ImageListItem key={productImage.src}>
          <Thumbnail productImage={productImage} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

interface ThumbnailProps {
  productImage: ProductImage;
}

function Thumbnail({ productImage }: ThumbnailProps) {
  const { src, alt } = productImage;

  return (
    <Box data-testid="product-thumbnail" sx={{ position: 'relative', aspectRatio: '1 / 1' }}>
      <Image alt={alt || ''} src={src} fill style={{ objectFit: 'cover' }} />
    </Box>
  );
}
