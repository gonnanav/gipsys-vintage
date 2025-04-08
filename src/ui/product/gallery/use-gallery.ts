import { useState } from 'react';
import { ProductImage } from '@/core/product';
import { createGallery } from './gallery-model';

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
  const selectImage = (index: number) => setGallery(createGallery(productImages, index));
  const { mainImage, thumbnailImages, selectedThumbnail } = gallery;

  const thumbnails = thumbnailImages.map((image, index) => ({
    image,
    isSelected: image === selectedThumbnail,
    onClick: () => selectImage(index),
  }));

  return { mainImage, thumbnails };
}
