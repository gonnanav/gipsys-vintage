import { render, screen, within } from '@testing-library/react';
import { ProductImage } from '@/core/product';
import { ProductGallery } from './product-gallery';
import userEvent from '@testing-library/user-event';

const productImages: ProductImage[] = [
  { src: '/images/product-1.jpg', alt: 'Product 1' },
  { src: '/images/product-2.jpg', alt: 'Product 2' },
  { src: '/images/product-3.jpg', alt: 'Product 3' },
];
const [firstImage, secondImage, thirdImage] = productImages;

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

  expect(getMainImage({ name: firstImage.alt })).toBeInTheDocument();
});

it('does not render thumbnails when there are no images', () => {
  renderProductGallery();

  expect(queryThumbnails()).not.toBeInTheDocument();
});

it('does not render thumbnails when there is a single image', () => {
  renderProductGallery([firstImage]);

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

it('switches the main image when the thumbnail is clicked', async () => {
  const user = userEvent.setup();
  renderProductGallery(productImages);

  const secondThumbnail = getThumbnail({ name: secondImage.alt });
  await user.click(secondThumbnail);

  expect(getMainImage({ name: secondImage.alt })).toBeInTheDocument();

  const thirdThumbnail = getThumbnail({ name: thirdImage.alt });
  await user.click(thirdThumbnail);

  expect(getMainImage({ name: thirdImage.alt })).toBeInTheDocument();

  const firstThumbnail = getThumbnail({ name: firstImage.alt });
  await user.click(firstThumbnail);

  expect(getMainImage({ name: firstImage.alt })).toBeInTheDocument();
});

function getMainImage({ name }: { name?: string }) {
  const mainImage = screen.getByTestId('product-main-image');
  return within(mainImage).getByRole('img', { name });
}

function queryThumbnails() {
  return screen.queryByTestId('product-thumbnails');
}

function getThumbnails() {
  return screen.getByTestId('product-thumbnails');
}

function getThumbnail({ name }: { name?: string }) {
  const thumbnails = getThumbnails();
  return within(thumbnails).getByRole('img', { name });
}

function renderProductGallery(productImages?: ProductImage[]) {
  render(<ProductGallery productImages={productImages} />);
}
