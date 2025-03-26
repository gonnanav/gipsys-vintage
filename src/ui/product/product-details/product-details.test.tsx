import { render, screen } from '@testing-library/react';
import { Product } from '@/core/product';
import { ProductDetails, ProductDetailsProps } from './product-details';

const product: Product = {
  id: 1,
  name: 'product1',
  price: '50',
  slug: 'product1',
};

it('renders the product name heading', () => {
  renderProductDetails();

  expect(screen.getByRole('heading', { level: 1, name: product.name })).toBeInTheDocument();
});

it('renders the product price', () => {
  renderProductDetails();

  expect(screen.getByText(`₪${product.price}`)).toBeInTheDocument();
});

it('renders the product description', () => {
  const description = 'A beautiful vintage piece';
  renderProductDetails({ product: { ...product, description } });

  expect(screen.getByText(description)).toBeInTheDocument();
});

function renderProductDetails(props: Partial<ProductDetailsProps> = {}) {
  render(<ProductDetails product={product} {...props} />);
}
