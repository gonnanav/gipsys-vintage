import { Product } from '@/core/product';
import { render, screen, within } from '@testing-library/react';
import { ProductCard, ProductCardProps } from './product-card';

const product: Product = {
  id: 1,
  name: 'product1',
  slug: 'product1',
  price: '100',
};

it('renders the product name', () => {
  const cardContainer = renderProductCard({ product });

  cardContainer.getByRole('heading', { level: 2, name: 'product1' });
});

it('renders the product price', () => {
  const cardContainer = renderProductCard({ product });

  cardContainer.getByText('₪100');
});

it('renders the main product image', () => {
  const productWithImage = { ...product, images: [{ src: 'product1.webp' }] };
  const cardContainer = renderProductCard({ product: productWithImage });

  cardContainer.getByRole('img', { name: 'product1' });
});

it('renders the placeholder image for a product without images', () => {
  const cardContainer = renderProductCard({ product });

  cardContainer.getByRole('img', { name: 'product1' });
});

it('renders a link to the product page', () => {
  const cardContainer = renderProductCard({ product });

  const link = cardContainer.getByRole('link');
  expect(link).toHaveAttribute('href', '/product/product1');
});

function renderProductCard({ product }: ProductCardProps) {
  render(<ProductCard product={product} />);

  return within(screen.getByRole('article'));
}
