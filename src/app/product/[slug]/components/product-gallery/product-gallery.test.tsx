import { render, screen, within } from '@testing-library/react';
import { ProductImage } from '@/application';
import { ProductGallery } from './product-gallery';

const productImages: ProductImage[] = [
  { src: '/images/product-1.jpg', alt: 'Product 1' },
  { src: '/images/product-2.jpg', alt: 'Product 2' },
  { src: '/images/product-3.jpg', alt: 'Product 3' },
];
const productImage = productImages[0];

it('renders the product gallery with the correct test id', () => {
  renderProductGallery();

  expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
});

it('renders the placeholder image as the main image when there are no images', () => {
  renderProductGallery();

  expect(getMainImage({ name: 'אין תמונת מוצר' })).toBeInTheDocument();
});

it('renders the first image as the main image by default', () => {
  renderProductGallery(productImages);

  expect(getMainImage({ name: 'Product 1' })).toBeInTheDocument();
});

it('does not render thumbnails when there are no images', () => {
  renderProductGallery();

  expect(queryThumbnails()).not.toBeInTheDocument();
});

it('does not render thumbnails when there is a single image', () => {
  renderProductGallery([productImage]);

  expect(queryThumbnails()).not.toBeInTheDocument();
});

it('renders all images as thumbnails when there are multiple images', () => {
  renderProductGallery(productImages);

  const thumbnails = getThumbnails();

  productImages.forEach((productImage) => {
    const thumbnail = within(thumbnails).getByRole('img', { name: productImage.alt });
    expect(thumbnail).toBeInTheDocument();
  });
});

function getMainImage({ name }: { name: string }) {
  const mainImage = screen.getByTestId('product-main-image');
  return within(mainImage).getByRole('img', { name });
}

function queryThumbnails() {
  return screen.queryByTestId('product-thumbnails');
}

function getThumbnails() {
  return screen.getByTestId('product-thumbnails');
}

function renderProductGallery(productImages?: ProductImage[]) {
  render(<ProductGallery productImages={productImages} />);
}
