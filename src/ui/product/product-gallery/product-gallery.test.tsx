import { render, screen, within } from '@testing-library/react';
import { ProductImage } from '@/core/product';
import { ProductGallery } from './product-gallery';
import userEvent from '@testing-library/user-event';

const productImages: ProductImage[] = [
  { src: '/images/product-1.jpg', alt: 'Product 1' },
  { src: '/images/product-2.jpg', alt: 'Product 2' },
];
const [firstImage, secondImage] = productImages;

it('renders the main image', () => {
  renderProductGallery(productImages);

  expect(getMainImage({ name: firstImage.alt })).toBeInTheDocument();
});

it('does not render the thumbnails when there are no thumbnails', () => {
  renderProductGallery();

  expect(queryThumbnails()).not.toBeInTheDocument();
});

it('renders the thumbnails when there are thumbnails', () => {
  renderProductGallery(productImages);

  const thumbnails = getThumbnails();

  productImages.forEach((productImage) => {
    const thumbnail = within(thumbnails).getByRole('img', { name: productImage.alt });
    expect(thumbnail).toBeInTheDocument();
  });
});

it('changes the main image when a thumbnail is clicked', async () => {
  const user = userEvent.setup();
  renderProductGallery(productImages);

  const secondThumbnail = getThumbnail({ name: secondImage.alt });
  await user.click(secondThumbnail);

  expect(getMainImage({ name: secondImage.alt })).toBeInTheDocument();
});

function getMainImage({ name }: { name?: string }) {
  return within(screen.getByRole('region', { name: 'תמונה ראשית' })).getByRole('img', {
    name,
    hidden: true,
  });
}

function queryThumbnails() {
  return screen.queryByRole('list', { name: 'תמונות נוספות' });
}

function getThumbnails() {
  return screen.getByRole('list', { name: 'תמונות נוספות' });
}

function getThumbnail({ name }: { name?: string }) {
  const thumbnails = getThumbnails();
  return within(thumbnails).getByRole('img', { name });
}

function renderProductGallery(productImages?: ProductImage[]) {
  render(<ProductGallery productImages={productImages} />);
}
