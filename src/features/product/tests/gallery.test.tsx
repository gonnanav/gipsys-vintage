import { render, screen, within } from '@testing-library/react';
import { ProductImage } from '@/core/product';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from '@/features/store';
import { ProductPage } from '@/features/product';
import { createTestProduct } from '@/fixtures/products';

it('renders the main image', () => {
  const image = { src: '/white-dress.webp', alt: 'White dress' };
  renderProductPage([image]);

  expect(getMainImage({ name: 'White dress' })).toBeInTheDocument();
});

it('does not render the thumbnails when there are no thumbnails', () => {
  renderProductPage();

  expect(queryThumbnails()).not.toBeInTheDocument();
});

it('renders the thumbnails when there are thumbnails', () => {
  const images = [
    { src: '/white-dress.webp', alt: 'White dress' },
    { src: '/black-dress.webp', alt: 'Black dress' },
  ];
  renderProductPage(images);

  const thumbnails = getThumbnails();

  images.forEach((image) => {
    const thumbnail = within(thumbnails).getByRole('img', { name: image.alt });
    expect(thumbnail).toBeInTheDocument();
  });
});

it('changes the main image when a thumbnail is clicked', async () => {
  const user = userEvent.setup();
  const images = [
    { src: '/white-dress.webp', alt: 'White dress' },
    { src: '/black-dress.webp', alt: 'Black dress' },
  ];
  renderProductPage(images);

  const secondThumbnail = getThumbnail({ name: 'Black dress' });
  await user.click(secondThumbnail);

  expect(getMainImage({ name: 'Black dress' })).toBeInTheDocument();
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

function renderProductPage(productImages?: ProductImage[]) {
  const product = createTestProduct({
    images: productImages,
  });

  render(<ProductPage product={product} />, {
    wrapper: StoreProvider,
  });
}
