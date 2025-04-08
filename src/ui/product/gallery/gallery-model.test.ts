import { ProductImage, placeholderImage } from '@/core/product';
import { createGallery } from './gallery-model';

describe.each([undefined, []])('without any images', (images?: ProductImage[]) => {
  const gallery = createGallery(images);

  it('displays the placeholder image as the main image', () => {
    expect(gallery.mainImage).toBe(placeholderImage);
  });

  it('does not display any thumbnails', () => {
    expect(gallery.thumbnailImages).toEqual([]);
  });

  it('does not display any selected thumbnail', () => {
    expect(gallery.selectedImageIndex).toBeNull();
  });
});

describe('with a single image', () => {
  const singleImage = { src: 'single-image.webp' };
  const gallery = createGallery([singleImage]);

  it('displays the image as the main image', () => {
    expect(gallery.mainImage).toBe(singleImage);
  });

  it('does not display any thumbnails', () => {
    expect(gallery.thumbnailImages).toEqual([]);
  });

  it('does not display any selected thumbnail', () => {
    expect(gallery.selectedImageIndex).toBeNull();
  });
});

describe('with multiple images by default', () => {
  const images = [{ src: 'first-image.webp' }, { src: 'second-image.webp' }];
  const gallery = createGallery(images);

  it('displays the first image as the main image', () => {
    expect(gallery.mainImage).toBe(images[0]);
  });

  it('displays all images as thumbnails by their order', () => {
    expect(gallery.thumbnailImages).toEqual(images);
  });

  it('displays the first thumbnail as the selected thumbnail', () => {
    expect(gallery.selectedImageIndex).toBe(0);
  });
});

describe('with multiple images and a selected image index', () => {
  const images = [{ src: 'first-image.webp' }, { src: 'second-image.webp' }];
  const selectedIndex = 1;
  const gallery = createGallery(images, selectedIndex);

  it('displays the selected image as the main image', () => {
    expect(gallery.mainImage).toBe(images[selectedIndex]);
  });

  it('displays the selected image thumbnail as the selected thumbnail', () => {
    expect(gallery.selectedImageIndex).toBe(selectedIndex);
  });
});

it.each([
  [[{ src: 'first-image.webp' }], -1],
  [[{ src: 'first-image.webp' }], 1],
])('throws an error if the selected index is out of bounds', (images, selectedIndex) => {
  expect(() => createGallery(images, selectedIndex)).toThrow();
});
