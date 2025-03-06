import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShoppingCart } from './shopping-cart';
import { createPortalWrapper } from '@/app/test-utils';

describe('Shopping Cart Closed', () => {
  it('renders the shopping cart button', () => {
    renderShoppingCart();

    expect(getShoppingCartButton()).toBeInTheDocument();
  });

  it('renders the shopping cart button with the correct test id for e2e tests', () => {
    renderShoppingCart();

    expect(getShoppingCartButton()).toBe(screen.getByTestId('shopping-cart-button'));
  });

  it('opens the shopping cart when the shopping cart button is clicked', async () => {
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

  it('renders the shopping cart modal under the body element by default', () => {
    renderShoppingCart({ initialIsOpen: true });

    const modal = getShoppingCartModal();
    expect(modal.parentElement).toBe(document.body);
  });

  it('renders the shopping cart modal under the provided portal root element', () => {
    const PortalWrapper = createPortalWrapper('test-portal-root');
    renderShoppingCart({ initialIsOpen: true, wrapper: PortalWrapper });

    const modal = getShoppingCartModal();
    const portalRoot = screen.getByTestId('test-portal-root');
    expect(modal.parentElement).toBe(portalRoot);
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

function renderShoppingCart({
  initialIsOpen = false,
  wrapper,
}: { initialIsOpen?: boolean; wrapper?: React.ComponentType<{ children: React.ReactNode }> } = {}) {
  const user = userEvent.setup();
  render(<ShoppingCart initialIsOpen={initialIsOpen} />, { wrapper });

  return { user };
}
