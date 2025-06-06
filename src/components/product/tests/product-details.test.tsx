import { render, screen } from '@testing-library/react';
import { Product } from '@/core/product';
import { StoreProvider } from '@/components/store';
import { ProductPage } from '@/components/product';
import { createTestProduct } from '@/fixtures/products';

it("renders the product's title", () => {
  renderProductPage({ name: 'Summer dress' });

  expect(getTitle()).toHaveTextContent('Summer dress');
});

it("renders the product's description", () => {
  renderProductPage({ description: 'A beautiful dress' });

  expect(getDescription('A beautiful dress')).toBeInTheDocument();
});

it("renders the product's price in shekels", () => {
  renderProductPage({ price: '100' });

  expect(getPrice('₪100')).toBeInTheDocument();
});

function renderProductPage(productProps: Partial<Product> = {}) {
  const product = createTestProduct(productProps);

  render(<ProductPage product={product} />, {
    wrapper: StoreProvider,
  });
}

function getTitle() {
  return screen.getByRole('heading', { level: 1 });
}

function getDescription(description: string) {
  return screen.getByText(description);
}

function getPrice(price: string) {
  return screen.getByText(price);
}
