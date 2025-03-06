import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShoppingCart } from './shopping-cart';
import { createPortalWrapper } from '@/app/test-utils';

it('renders the shopping cart closed by default', () => {
  renderShoppingCart();

  expect(queryShoppingCartModal()).not.toBeInTheDocument();
});

describe('Shopping Cart Closed', () => {
  it('renders the shopping cart button', () => {
    renderShoppingCartClosed();

    expect(getShoppingCartButton()).toBeInTheDocument();
  });

  it('renders the shopping cart button with the correct test id for e2e tests', () => {
    renderShoppingCartClosed();

    expect(getShoppingCartButton()).toBe(screen.getByTestId('shopping-cart-button'));
  });

  it('opens the shopping cart when the shopping cart button is clicked', async () => {
    const { user } = renderShoppingCartClosed();

    await user.click(getShoppingCartButton());

    expect(getShoppingCartModal()).toBeInTheDocument();
  });
});

describe('Shopping Cart Open', () => {
  it('renders the shopping cart modal', async () => {
    renderShoppingCartOpen();

    const modal = getShoppingCartModal();
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  it('renders the shopping cart modal with the correct test id for e2e tests', () => {
    renderShoppingCartOpen();

    expect(getShoppingCartModal()).toBe(screen.getByTestId('shopping-cart-modal'));
  });

  it('renders the shopping cart title with the correct text', () => {
    renderShoppingCartOpen();

    expect(getShoppingCartTitle()).toHaveTextContent('סל הקניות');
  });

  it('renders the shopping cart title with a the correct test id for e2e tests', () => {
    renderShoppingCartOpen();

    expect(getShoppingCartTitle()).toBe(screen.getByTestId('shopping-cart-title'));
  });

  it('closes the shopping cart when the close button is clicked', async () => {
    const { user } = renderShoppingCartOpen();

    await user.click(getShoppingCartCloseButton());

    expect(queryShoppingCartModal()).not.toBeInTheDocument();
  });

  it('renders the shopping cart modal under the body element by default', () => {
    renderShoppingCartOpen();

    expect(getShoppingCartModal()).toBeChildOf(document.body);
  });

  it('renders the shopping cart modal under the provided portal root element', () => {
    renderShoppingCartOpen({ wrapper: createPortalWrapper('test-portal-root') });

    expect(getShoppingCartModal()).toBeChildOf(screen.getByTestId('test-portal-root'));
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

function renderShoppingCartOpen(props?: Parameters<typeof renderShoppingCart>[0]) {
  return renderShoppingCart({ ...props, initialIsOpen: true });
}

function renderShoppingCartClosed(props?: Parameters<typeof renderShoppingCart>[0]) {
  return renderShoppingCart({ ...props, initialIsOpen: false });
}

function renderShoppingCart({
  initialIsOpen = false,
  wrapper,
}: { initialIsOpen?: boolean; wrapper?: React.ComponentType<{ children: React.ReactNode }> } = {}) {
  const user = userEvent.setup();
  render(<ShoppingCart initialIsOpen={initialIsOpen} />, { wrapper });

  return { user };
}
