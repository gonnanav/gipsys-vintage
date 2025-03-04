import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShoppingCart } from './shopping-cart';

describe('Shopping Cart Closed', () => {
  it('renders the shopping cart button', () => {
    renderShoppingCart();

    expect(getShoppingCartButton()).toBeInTheDocument();
  });

  it('renders the shopping cart button with the correct test id for e2e tests', () => {
    renderShoppingCart();

    expect(getShoppingCartButton()).toBe(screen.getByTestId('shopping-cart-button'));
  });

  it('opens the shopping cart when the button is clicked', async () => {
    const { user } = renderShoppingCart();

    await user.click(getShoppingCartButton());

    expect(getShoppingCartModal()).toBeInTheDocument();
  });
});

describe('Shopping Cart Open', () => {
  it('renders the shopping cart modal', async () => {
    renderShoppingCart({ initialIsOpen: true });

    const modal = getShoppingCartModal();
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  it('renders the shopping cart modal with the correct test id for e2e tests', () => {
    renderShoppingCart({ initialIsOpen: true });

    expect(getShoppingCartModal()).toBe(screen.getByTestId('shopping-cart-modal'));
  });

  it('renders the shopping cart title with the correct text', () => {
    renderShoppingCart({ initialIsOpen: true });

    expect(getShoppingCartTitle()).toHaveTextContent('סל הקניות');
  });

  it('renders the shopping cart title with a the correct test id for e2e tests', () => {
    renderShoppingCart({ initialIsOpen: true });

    expect(getShoppingCartTitle()).toBe(screen.getByTestId('shopping-cart-title'));
  });

  it('closes the shopping cart when the close button is clicked', async () => {
    const { user } = renderShoppingCart({ initialIsOpen: true });

    await user.click(getShoppingCartCloseButton());

    expect(queryShoppingCartModal()).not.toBeInTheDocument();
  });
});

function getShoppingCartButton() {
  return screen.getByRole('button', { name: 'פתחי את סל הקניות' });
}

function getShoppingCartModal() {
  return screen.getByRole('dialog', { name: 'סל הקניות' });
}

function queryShoppingCartModal() {
  return screen.queryByRole('dialog', { name: 'סל הקניות' });
}

function getShoppingCartTitle() {
  return screen.getByRole('heading', { name: 'סל הקניות' });
}

function getShoppingCartCloseButton() {
  return screen.getByRole('button', { name: 'סגרי את עגלת הקניות' });
}

function renderShoppingCart({ initialIsOpen = false }: { initialIsOpen?: boolean } = {}) {
  const user = userEvent.setup();
  render(<ShoppingCart initialIsOpen={initialIsOpen} />);

  return { user };
}
