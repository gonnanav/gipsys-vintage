'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ProductImage } from '@/core/product';
import { useGallery, Thumbnail } from './use-gallery';

interface ProductGalleryProps {
  productImages?: ProductImage[];
}

export function ProductGallery({ productImages }: ProductGalleryProps) {
  const { mainImage, thumbnails } = useGallery(productImages);

  return (
    <Box role="region" aria-label="תמונות המוצר">
      <MainImage productImage={mainImage} />
      {thumbnails.length > 0 && <ThumbnailImages thumbnails={thumbnails} />}
    </Box>
  );
}

interface MainImageProps {
  productImage: ProductImage;
}

function MainImage({ productImage }: MainImageProps) {
  const { src, alt = '' } = productImage;

  return (
    <Box role="region" aria-label="תמונה ראשית" sx={{ position: 'relative', aspectRatio: '3 / 4' }}>
      <Image alt={alt} src={src} fill style={{ objectFit: 'cover' }} />
    </Box>
  );
}

interface ThumbnailImagesProps {
  thumbnails: Thumbnail[];
}

function ThumbnailImages({ thumbnails }: ThumbnailImagesProps) {
  return (
    <ImageList aria-label="תמונות נוספות" cols={3} gap={8}>
      {thumbnails.map(({ image, isSelected, onClick }, index) => (
        <ImageListItem key={index}>
          <ThumbnailImage productImage={image} onClick={onClick} isSelected={isSelected} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

interface ThumbnailImageProps {
  productImage: ProductImage;
  isSelected: boolean;
  onClick: () => void;
}

function ThumbnailImage({ productImage, isSelected, onClick }: ThumbnailImageProps) {
  const { src, alt = '' } = productImage;

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '1 / 1',
        cursor: 'pointer',
        opacity: isSelected ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
        '&:hover': {
          opacity: 1,
        },
      }}
      onClick={onClick}
    >
      <Image alt={alt} src={src} fill style={{ objectFit: 'cover' }} />
    </Box>
  );
}
