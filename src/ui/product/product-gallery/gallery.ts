import { ProductImage, placeholderImage } from '@/core/product';

export interface ImageGallery {
  mainImage: ProductImage;
  thumbnails: ProductImage[];
  selectedThumbnail: ProductImage | null;
}

const emptyGallery: ImageGallery = {
  mainImage: placeholderImage,
  thumbnails: [],
  selectedThumbnail: null,
};

export function createGallery(images?: ProductImage[], selectedIndex: number = 0): ImageGallery {
  if (!images || images.length === 0) return emptyGallery;

  if (selectedIndex < 0 || selectedIndex >= images.length) {
    throw new Error('Selected image index is out of bounds');
  }

  const mainImage = images[selectedIndex];
  const thumbnails = images.length > 1 ? images : [];
  const selectedThumbnail = thumbnails[selectedIndex] ?? null;

  return { mainImage, thumbnails, selectedThumbnail };
}
