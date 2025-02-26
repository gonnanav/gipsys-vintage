import { render, screen } from '@testing-library/react';
import { Product } from '@/core/product';
import { ProductDetails } from './product-details';

const product: Product = {
  id: 1,
  name: 'product1',
  price: '50',
  slug: 'product1',
};

it('renders the product name as a heading', () => {
  renderProductDetails();

  screen.getByRole('heading', { level: 1, name: product.name });
});

it('renders the product price', () => {
  renderProductDetails();

  screen.getByText(`₪${product.price}`);
});

it('renders the product description', () => {
  const description = 'A beautiful vintage piece';
  renderProductDetails({ ...product, description });

  screen.getByText(description);
});

function renderProductDetails(props: Partial<Product> = {}) {
  render(<ProductDetails product={{ ...product, ...props }} />);
}
