import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddToCartButton } from './add-to-cart-button';
import { cottonScarf } from '@/fixtures/products';
import { Product } from '@/core/product';
import { StoreProvider, useCart } from '@/store';

it('renders the add to cart button', () => {
  renderAddToCartButton(cottonScarf);

  expect(getAddToCartButton()).toBeInTheDocument();
});

it('adds the product to the cart when clicked', async () => {
  const user = userEvent.setup();
  const { result } = renderAddToCartButtonWithConsumer(cottonScarf);

  await user.click(getAddToCartButton());

  expect(result.current.items).toEqual([cottonScarf]);
});

function getAddToCartButton() {
  return screen.getByRole('button', { name: 'הוסיפי לסל הקניות' });
}

/**
 * Renders the add to cart button with the shopping cart provider.
 */
function renderAddToCartButton(product: Product) {
  return render(<AddToCartButton product={product} />, {
    wrapper: StoreProvider,
  });
}

function renderAddToCartButtonWithConsumer(product: Product) {
  return renderHook(() => useCart(), {
    wrapper: ({ children }) => (
      <StoreProvider>
        {children}
        <AddToCartButton product={product} />
      </StoreProvider>
    ),
  });
}
