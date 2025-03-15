import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  productWithoutImages as product1,
  productWithOneImage as product2,
} from '@/fixtures/products';
import { createPortalWrapper } from '@/ui/test-utils/factories';
import { ShoppingCartProvider } from '@/ui/providers/shopping-cart/shopping-cart-provider';
import { ShoppingCartDrawer, ShoppingCartDrawerProps } from './shopping-cart-drawer';
import { Product } from '@/core/product';

it('renders the shopping cart closed by default', () => {
  renderShoppingCart({ isOpen: false, onClose: jest.fn() });

  expect(queryShoppingCartModal()).not.toBeInTheDocument();
});

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
  const onClose = jest.fn();
  const { user } = renderShoppingCartOpen({ onClose });

  await user.click(getShoppingCartCloseButton());

  expect(onClose).toHaveBeenCalled();
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
  renderShoppingCartOpen(undefined, ({ children }) => (
    <ShoppingCartProvider initialCart={initialCart}>{children}</ShoppingCartProvider>
  ));

  expect(getShoppingCartItems()[0]).toHaveTestId('shopping-cart-item');
});

it('renders a shopping cart empty message when the cart is empty', () => {
  renderShoppingCartOpen(undefined, ({ children }) => (
    <ShoppingCartProvider initialCart={[]}>{children}</ShoppingCartProvider>
  ));

  expect(getShoppingCartEmptyMessage()).toBeInTheDocument();
});

it('removes a shopping cart item when the remove button is clicked', async () => {
  const { user } = renderShoppingCartOpen(undefined, ({ children }) => (
    <ShoppingCartProvider initialCart={[product1]}>{children}</ShoppingCartProvider>
  ));

  await user.click(getShoppingCartRemoveButton(product1));

  expect(getShoppingCartEmptyMessage()).toBeInTheDocument();
});

it('renders the item remove button with the correct test id for e2e tests', () => {
  renderShoppingCartOpen(undefined, ({ children }) => (
    <ShoppingCartProvider initialCart={[product1]}>{children}</ShoppingCartProvider>
  ));

  expect(getShoppingCartRemoveButton(product1)).toHaveTestId('shopping-cart-item-remove-button');
});

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
  props?: Partial<ShoppingCartDrawerProps>,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>,
) {
  return renderShoppingCart({ ...props, isOpen: true }, wrapper);
}

const defaultWrapper = ({ children }: { children: React.ReactNode }) => (
  <ShoppingCartProvider>{children}</ShoppingCartProvider>
);

function renderShoppingCart(
  props?: Partial<ShoppingCartDrawerProps>,
  wrapper: React.ComponentType<{ children: React.ReactNode }> = defaultWrapper,
) {
  const user = userEvent.setup();
  render(<ShoppingCartDrawer isOpen={true} onClose={jest.fn()} {...props} />, { wrapper });

  return { user };
}
