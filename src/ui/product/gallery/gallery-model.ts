import { ProductImage, placeholderImage } from '@/core/product';

export interface ProductGallery {
  mainImage: ProductImage;
  thumbnailImages: ProductImage[];
  selectedImageIndex: number | null;
}

const emptyGallery: ProductGallery = {
  mainImage: placeholderImage,
  thumbnailImages: [],
  selectedImageIndex: null,
};

export function createGallery(images?: ProductImage[], selectedIndex: number = 0): ProductGallery {
  if (!images || images.length === 0) return emptyGallery;

  if (selectedIndex < 0 || selectedIndex >= images.length) {
    throw new Error('Selected image index is out of bounds');
  }

  const mainImage = images[selectedIndex];
  const hasThumbnails = images.length > 1;
  const thumbnailImages = hasThumbnails ? images : [];
  const selectedImageIndex = hasThumbnails ? selectedIndex : null;

  return { mainImage, thumbnailImages, selectedImageIndex };
}
