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

it('renders the add to cart button', () => {
  renderProductLayout();

  expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument();
});

function renderProductLayout() {
  return render(
    <ProductLayout
      productGallery={<div data-testid="product-gallery" />}
      productDetails={<div data-testid="product-details" />}
      addToCartButton={<div data-testid="add-to-cart-button" />}
    />,
  );
}
