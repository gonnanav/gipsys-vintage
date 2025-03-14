import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  productWithoutImages as product1,
  productWithOneImage as product2,
} from '@/fixtures/products';
import { createPortalWrapper } from '@/app/test-utils/factories';
import { ShoppingCartProvider } from '@/app/providers/shopping-cart/shopping-cart-provider';
import { ShoppingCart, ShoppingCartProps } from './shopping-cart';
import { Product } from '@/core/product';

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

    expect(getShoppingCartButton()).toHaveTestId('shopping-cart-button');
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

    expect(getShoppingCartModal()).toHaveAttribute('aria-modal', 'true');
  });

  it('renders the shopping cart modal with the correct test id for e2e tests', () => {
    renderShoppingCartOpen();

    expect(getShoppingCartModal()).toHaveTestId('shopping-cart-modal');
  });

  it('renders the shopping cart title with the correct text', () => {
    renderShoppingCartOpen();

    expect(getShoppingCartTitle()).toHaveTextContent('סל הקניות');
  });

  it('renders the shopping cart title with a the correct test id for e2e tests', () => {
    renderShoppingCartOpen();

    expect(getShoppingCartTitle()).toHaveTestId('shopping-cart-title');
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
    const PortalRoot = createPortalWrapper('test-portal-root');
    renderShoppingCartOpen({}, ({ children }) => (
      <PortalRoot>
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </PortalRoot>
    ));

    expect(getShoppingCartModal()).toBeChildOf(screen.getByTestId('test-portal-root'));
  });

  it('renders the shopping cart list for a non-empty cart', () => {
    // Arrange
    const initialCart = [product1, product2];

    // Act
    renderShoppingCartOpen({}, ({ children }) => (
      <ShoppingCartProvider initialCart={initialCart}>{children}</ShoppingCartProvider>
    ));

    // Assert
    expect(getShoppingCartList()).toBeInTheDocument();
  });

  it('renders the shopping cart items for a non-empty cart', () => {
    // Arrange
    const initialCart = [product1, product2];

    // Act
    renderShoppingCartOpen({}, ({ children }) => (
      <ShoppingCartProvider initialCart={initialCart}>{children}</ShoppingCartProvider>
    ));

    // Assert
    const items = getShoppingCartItems();

    initialCart.forEach((product, index) => {
      const { name, price } = product;
      const item = items[index];

      expect(item).toHaveTextContent(name);
      expect(item).toHaveTextContent(`₪${price}`);
      expect(within(item).getByRole('img')).toBeInTheDocument();
    });
  });

  it('renders a shopping cart item with the correct test id for e2e tests', () => {
    const initialCart = [product1];
    renderShoppingCartOpen({}, ({ children }) => (
      <ShoppingCartProvider initialCart={initialCart}>{children}</ShoppingCartProvider>
    ));

    expect(getShoppingCartItems()[0]).toHaveTestId('shopping-cart-item');
  });

  it('renders a shopping cart empty message when the cart is empty', () => {
    renderShoppingCartOpen({}, ({ children }) => (
      <ShoppingCartProvider initialCart={[]}>{children}</ShoppingCartProvider>
    ));

    expect(getShoppingCartEmptyMessage()).toBeInTheDocument();
  });

  it('renders a shopping cart empty message with the correct test id for e2e tests', () => {
    renderShoppingCartOpen({}, ({ children }) => (
      <ShoppingCartProvider initialCart={[]}>{children}</ShoppingCartProvider>
    ));

    expect(getShoppingCartEmptyMessage()).toHaveTestId('shopping-cart-empty-message');
  });

  it('removes a shopping cart item when the remove button is clicked', async () => {
    const { user } = renderShoppingCartOpen({}, ({ children }) => (
      <ShoppingCartProvider initialCart={[product1]}>{children}</ShoppingCartProvider>
    ));

    await user.click(getShoppingCartRemoveButton(product1));

    expect(getShoppingCartEmptyMessage()).toBeInTheDocument();
  });

  it('renders the item remove button with the correct test id for e2e tests', () => {
    renderShoppingCartOpen({}, ({ children }) => (
      <ShoppingCartProvider initialCart={[product1]}>{children}</ShoppingCartProvider>
    ));

    expect(getShoppingCartRemoveButton(product1)).toHaveTestId('shopping-cart-item-remove-button');
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

function getShoppingCartList() {
  return screen.getByRole('list', { name: 'פריטים בסל הקניות' });
}

function getShoppingCartItems() {
  return within(getShoppingCartList()).getAllByRole('listitem');
}

function getShoppingCartItem(product: Product) {
  const item = getShoppingCartItems().find((item) => within(item).getByText(product.name));

  if (!item) {
    throw new Error(`Shopping cart item for product ${product.name} not found`);
  }

  return item;
}

function getShoppingCartRemoveButton(product: Product) {
  return within(getShoppingCartItem(product)).getByRole('button', { name: 'הסירי מסל הקניות' });
}

function getShoppingCartEmptyMessage() {
  return screen.getByText('אין פריטים בסל');
}

function renderShoppingCartOpen(
  props?: ShoppingCartProps,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>,
) {
  return renderShoppingCart({ ...props, initialIsOpen: true }, wrapper);
}

function renderShoppingCartClosed(
  props?: ShoppingCartProps,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>,
) {
  return renderShoppingCart({ ...props, initialIsOpen: false }, wrapper);
}

const defaultWrapper = ({ children }: { children: React.ReactNode }) => (
  <ShoppingCartProvider>{children}</ShoppingCartProvider>
);

function renderShoppingCart(
  props?: ShoppingCartProps,
  wrapper: React.ComponentType<{ children: React.ReactNode }> = defaultWrapper,
) {
  const user = userEvent.setup();
  render(<ShoppingCart {...props} />, { wrapper });

  return { user };
}
