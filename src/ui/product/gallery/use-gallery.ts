import { useState } from 'react';
import { ProductImage } from '@/core/product';
import { createGallery } from './model/gallery';

export interface Thumbnail {
  image: ProductImage;
  isSelected: boolean;
  onClick: () => void;
}

export interface UseGalleryReturn {
  mainImage: ProductImage;
  thumbnails: Thumbnail[];
}

export function useGallery(productImages?: ProductImage[]): UseGalleryReturn {
  const [gallery, setGallery] = useState(createGallery(productImages));
  const { mainImage, thumbnailImages, selectedImageIndex } = gallery;

  const selectImage = (index: number) => setGallery(createGallery(productImages, index));

  const thumbnails = thumbnailImages.map((image, index) => ({
    image,
    isSelected: index === selectedImageIndex,
    onClick: () => selectImage(index),
  }));

  return { mainImage, thumbnails };
}
