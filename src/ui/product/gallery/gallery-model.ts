import { ProductImage, placeholderImage } from '@/core/product';

export interface ProductGallery {
  mainImage: ProductImage;
  thumbnailImages: ProductImage[];
  selectedThumbnail: ProductImage | null;
}

const emptyGallery: ProductGallery = {
  mainImage: placeholderImage,
  thumbnailImages: [],
  selectedThumbnail: null,
};

export function createGallery(images?: ProductImage[], selectedIndex: number = 0): ProductGallery {
  if (!images || images.length === 0) return emptyGallery;

  if (selectedIndex < 0 || selectedIndex >= images.length) {
    throw new Error('Selected image index is out of bounds');
  }

  const mainImage = images[selectedIndex];
  const thumbnailImages = images.length > 1 ? images : [];
  const selectedThumbnail = thumbnailImages[selectedIndex] ?? null;

  return { mainImage, thumbnailImages, selectedThumbnail };
}
