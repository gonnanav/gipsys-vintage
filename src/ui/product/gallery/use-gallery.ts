import { useState } from 'react';
import { ProductImage } from '@/core/product';
import { createGallery } from './gallery-model';

export function useGallery(productImages?: ProductImage[]) {
  const [gallery, setGallery] = useState(createGallery(productImages));
  const selectImage = (index: number) => setGallery(createGallery(productImages, index));

  return { ...gallery, selectImage };
}
