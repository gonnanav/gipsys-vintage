import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cottonScarf, puffSleeveTop } from '@/fixtures/products';
import { CartDrawer } from './cart-drawer';
import { Product } from '@/core/product';
import { StoreProvider } from '@/store';

describe('when the cart is closed', () => {
  it('renders nothing', () => {
    renderCartDrawer({ initialIsOpen: false });

    expect(queryCartDrawer()).not.toBeInTheDocument();
  });
});

describe('when the cart is open', () => {
  it('renders the cart drawer and title', () => {
    renderCartDrawer();

    expect(getCartDrawer()).toBeInTheDocument();
    expect(getCartTitle()).toBeInTheDocument();
  });

  it('closes the cart', async () => {
    const { closeCart } = renderCartDrawer();

    await closeCart();

    expect(queryCartDrawer()).not.toBeInTheDocument();
  });
});

describe('when the cart is empty', () => {
  it('renders the empty cart message', () => {
    renderCartDrawer({ initialCart: [] });

    expect(getCartIsEmptyMessage()).toBeInTheDocument();
  });
});

describe('when the cart has items', () => {
  it('renders the cart items', () => {
    renderCartDrawer({ initialCart: [cottonScarf, puffSleeveTop] });

    const items = getAllCartItems();

    expect(items).toHaveLength(2);

    expect(items[0]).toHaveTextContent(cottonScarf.name);
    expect(items[0]).toHaveTextContent(`₪${cottonScarf.price}`);
    expect(within(items[0]).getByRole('img')).toBeInTheDocument();

    expect(items[1]).toHaveTextContent(puffSleeveTop.name);
    expect(items[1]).toHaveTextContent(`₪${puffSleeveTop.price}`);
    expect(within(items[1]).getByRole('img')).toBeInTheDocument();
  });

  it('removes an item from the cart', async () => {
    const { removeItem } = renderCartDrawer({ initialCart: [cottonScarf, puffSleeveTop] });

    await removeItem(cottonScarf);

    const items = getAllCartItems();

    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent(puffSleeveTop.name);
    expect(items[0]).toHaveTextContent(`₪${puffSleeveTop.price}`);
    expect(within(items[0]).getByRole('img')).toBeInTheDocument();
  });
});

function getCartDrawer() {
  return screen.getByRole('dialog', { name: 'סל הקניות' });
}

function queryCartDrawer() {
  return screen.queryByRole('dialog', { name: 'סל הקניות' });
}

function getCartTitle() {
  return within(getCartDrawer()).getByRole('heading', { name: 'סל הקניות' });
}

function getCartCloseButton() {
  return screen.getByRole('button', { name: 'סגרי את עגלת הקניות' });
}

function getCartList() {
  return screen.getByRole('list', { name: 'פריטים בסל הקניות' });
}

function getAllCartItems() {
  return within(getCartList()).getAllByRole('listitem');
}

function getCartItem(product: Product) {
  const item = getAllCartItems().find((item) => within(item).getByText(product.name));

  if (!item) {
    throw new Error(`Shopping cart item for product ${product.name} not found`);
  }

  return item;
}

function getCartRemoveButton(product: Product) {
  return within(getCartItem(product)).getByRole('button', { name: 'הסירי מסל הקניות' });
}

function getCartIsEmptyMessage() {
  return within(getCartDrawer()).getByText('אין פריטים בסל');
}

interface RenderCartDrawerProps {
  initialCart?: Product[];
  initialIsOpen?: boolean;
  Wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

function renderCartDrawer({
  Wrapper,
  initialCart = [],
  initialIsOpen = true,
}: RenderCartDrawerProps = {}) {
  const defaultWrapper = ({ children }: { children: React.ReactNode }) => (
    <StoreProvider initialState={{ cartItems: initialCart, isCartDrawerOpen: initialIsOpen }}>
      {children}
    </StoreProvider>
  );

  const user = userEvent.setup();
  render(<CartDrawer />, { wrapper: Wrapper ?? defaultWrapper });

  const closeCart = () => user.click(getCartCloseButton());
  const removeItem = (product: Product) => user.click(getCartRemoveButton(product));

  return { closeCart, removeItem };
}
