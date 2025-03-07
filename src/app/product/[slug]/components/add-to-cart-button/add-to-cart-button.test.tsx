import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShoppingCartContext } from '@/app/contexts';
import { AddToCartButton } from './add-to-cart-button';

it('renders the add to cart button', () => {
  render(<AddToCartButton />);

  expect(getAddToCartButton()).toBeInTheDocument();
});

it('renders the button with the correct test id for e2e tests', () => {
  render(<AddToCartButton />);

  expect(getAddToCartButton()).toHaveTestId('add-to-cart-button');
});

it('calls the provided onAddProduct when clicked', async () => {
  const onAddProduct = jest.fn();
  const user = userEvent.setup();

  render(<AddToCartButton />, {
    wrapper: ({ children }) => (
      <ShoppingCartContext value={{ onAddProduct }}>{children}</ShoppingCartContext>
    ),
  });

  await user.click(getAddToCartButton());

  expect(onAddProduct).toHaveBeenCalled();
});

function getAddToCartButton() {
  return screen.getByRole('button', { name: 'הוסיפי לסל הקניות' });
}
