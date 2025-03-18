import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  productWithoutImages as product1,
  productWithOneImage as product2,
} from '@/fixtures/products';
import { ShoppingCartDrawer } from './shopping-cart-drawer';
import { Product } from '@/core/product';
import { StoreProvider } from '@/store';

it('renders the modal', async () => {
  renderShoppingCartDrawer();

  expect(getShoppingCartModal()).toHaveAttribute('aria-modal', 'true');
});

it('renders the modal with the correct test id for e2e tests', () => {
  renderShoppingCartDrawer();

  expect(getShoppingCartModal()).toHaveTestId('shopping-cart-modal');
});

it('renders the modal under the body element by default', () => {
  renderShoppingCartDrawer();

  expect(getShoppingCartModal()).toBeChildOf(document.body);
});

it('renders the title with the correct text', () => {
  renderShoppingCartDrawer();

  expect(getShoppingCartTitle()).toHaveTextContent('סל הקניות');
});

it('renders the title with a the correct test id for e2e tests', () => {
  renderShoppingCartDrawer();

  expect(getShoppingCartTitle()).toHaveTestId('shopping-cart-title');
});

it('renders the list for a non-empty cart', () => {
  const initialCart = [product1, product2];
  renderShoppingCartDrawer({ initialCart });

  expect(getShoppingCartList()).toBeInTheDocument();
});

it('renders a shopping cart item with the correct test id for e2e tests', () => {
  const initialCart = [product1];
  renderShoppingCartDrawer({ initialCart });

  expect(getShoppingCartItems()[0]).toHaveTestId('shopping-cart-item');
});

it('renders the cart items for a non-empty cart', () => {
  const initialCart = [product1, product2];

  renderShoppingCartDrawer({ initialCart });

  const items = getShoppingCartItems();

  initialCart.forEach((product, index) => {
    const { name, price } = product;
    const item = items[index];

    expect(item).toHaveTextContent(name);
    expect(item).toHaveTextContent(`₪${price}`);
    expect(within(item).getByRole('img')).toBeInTheDocument();
  });
});

it('renders a shopping cart empty message when the cart is empty', () => {
  renderShoppingCartDrawer({ initialCart: [] });

  expect(getShoppingCartEmptyMessage()).toBeInTheDocument();
});

it('renders the item remove button with the correct test id for e2e tests', () => {
  renderShoppingCartDrawer({ initialCart: [product1] });

  expect(getShoppingCartRemoveButton(product1)).toHaveTestId('shopping-cart-item-remove-button');
});

it('closes when the close button is clicked', async () => {
  const { user } = renderShoppingCartDrawer();

  await user.click(getShoppingCartCloseButton());

  expect(queryShoppingCartModal()).not.toBeInTheDocument();
});

it('removes a shopping cart item when the remove button is clicked', async () => {
  const { user } = renderShoppingCartDrawer({ initialCart: [product1] });

  await user.click(getShoppingCartRemoveButton(product1));

  expect(getShoppingCartEmptyMessage()).toBeInTheDocument();
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

interface RenderShoppingCartDrawerProps {
  initialCart?: Product[];
  initialIsOpen?: boolean;
  Wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

function renderShoppingCartDrawer({
  Wrapper,
  initialCart = [],
  initialIsOpen = true,
}: RenderShoppingCartDrawerProps = {}) {
  const defaultWrapper = ({ children }: { children: React.ReactNode }) => (
    <StoreProvider initialState={{ cartItems: initialCart, isCartDrawerOpen: initialIsOpen }}>
      {children}
    </StoreProvider>
  );

  const user = userEvent.setup();
  render(<ShoppingCartDrawer />, { wrapper: Wrapper ?? defaultWrapper });

  return { user };
}
