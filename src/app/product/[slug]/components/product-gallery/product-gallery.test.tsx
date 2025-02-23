import { render, screen } from '@testing-library/react';
import { ProductGallery } from './product-gallery';

it('renders the product gallery with the correct test id', () => {
  render(<ProductGallery />);

  expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
});
