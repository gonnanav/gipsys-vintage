import { render, screen } from '@testing-library/react';
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
