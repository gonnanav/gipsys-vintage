import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Product } from '@/core/product';
import { StoreProvider, useCart } from '@/features/store';
import { createTestProduct } from '@/fixtures/products';
import { ProductPage } from '@/features/product';

it('adds the product to the cart', async () => {
  const { addToCart } = renderProductPage({ name: 'Summer dress' });

  await addToCart();

  expect(getCartItem('Summer dress')).toBeInTheDocument();
});

function renderProductPage(productProps: Partial<Product> = {}) {
  const user = userEvent.setup();
  const product = createTestProduct(productProps);

  render(<ProductPage product={product} />, {
    wrapper: ({ children }) => (
      <StoreProvider>
        <MockCart />
        {children}
      </StoreProvider>
    ),
  });

  const addToCart = () => user.click(getAddToCartButton());

  return { addToCart };
}

function MockCart() {
  const { items } = useCart();

  return (
    <div data-testid="cart">
      {items.map((item) => (
        <div key={item.id} data-testid="cart-item">
          {item.name}
        </div>
      ))}
    </div>
  );
}

function getAddToCartButton() {
  return screen.getByRole('button', { name: 'הוסיפי לסל הקניות' });
}

function getCart() {
  return screen.getByTestId('cart');
}

function getCartItem(name: string) {
  return within(getCart()).getByText(name);
}
