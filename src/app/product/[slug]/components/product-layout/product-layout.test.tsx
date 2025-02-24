import { render, screen } from '@testing-library/react';
import { ProductLayout } from './product-layout';

it('renders the product gallery', () => {
  renderProductLayout();

  expect(screen.getByTestId('product-gallery')).toBeInTheDocument();
});

it('renders the product details', () => {
  renderProductLayout();

  expect(screen.getByTestId('product-details')).toBeInTheDocument();
});

function renderProductLayout() {
  return render(
    <ProductLayout
      productGallery={<div data-testid="product-gallery" />}
      productDetails={<div data-testid="product-details" />}
    />,
  );
}
