import { render, screen } from '@testing-library/react';
import { ProductImage } from '@/application';
import { ProductGallery } from './product-gallery';

it('renders the product gallery with the correct test id', () => {
  render(<ProductGallery />);

  expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
});

it('renders a placeholder image when there are no images', () => {
  render(<ProductGallery />);

  const placeholderImage = screen.getByRole('img', { name: 'אין תמונת מוצר' });
  expect(placeholderImage).toBeInTheDocument();
});

it('renders the first image', () => {
  const productImages: ProductImage[] = [
    { src: '/images/product-1.jpg', alt: 'Product 1' },
    { src: '/images/product-2.jpg', alt: 'Product 2' },
  ];

  render(<ProductGallery productImages={productImages} />);

  const image = screen.getByRole('img', { name: 'Product 1' });
  expect(image).toBeInTheDocument();
});
