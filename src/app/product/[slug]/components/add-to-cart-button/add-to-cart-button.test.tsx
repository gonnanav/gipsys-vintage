import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddToCartButton } from './add-to-cart-button';
import {
  ShoppingCartProvider,
  useShoppingCart,
} from '@/app/providers/shopping-cart/shopping-cart-provider';
import { productWithoutImages as product } from '@/fixtures/products';
import { Product } from '@/core/product';
it('renders the add to cart button', () => {
  renderAddToCartButton(product);

  expect(getAddToCartButton()).toBeInTheDocument();
});

it('renders the button with the correct test id for e2e tests', () => {
  renderAddToCartButton(product);

  expect(getAddToCartButton()).toHaveTestId('add-to-cart-button');
});

it('adds the product to the cart when clicked', async () => {
  const user = userEvent.setup();
  const { result } = renderAddToCartButtonWithConsumer(product);

  await user.click(getAddToCartButton());

  expect(result.current.cart).toEqual([product]);
});

function getAddToCartButton() {
  return screen.getByRole('button', { name: 'הוסיפי לסל הקניות' });
}

/**
 * Renders the add to cart button with the shopping cart provider.
 */
function renderAddToCartButton(product: Product) {
  return render(<AddToCartButton product={product} />, {
    wrapper: ShoppingCartProvider,
  });
}

/**
 * Renders the add to cart button with the shopping cart provider and a consumer of the shopping cart.
 * This is used to test the add to cart button's behavior.
 */
function renderAddToCartButtonWithConsumer(product: Product) {
  return renderHook(() => useShoppingCart(), {
    wrapper: ({ children }) => (
      <ShoppingCartProvider>
        {children}
        <AddToCartButton product={product} />
      </ShoppingCartProvider>
    ),
  });
}
