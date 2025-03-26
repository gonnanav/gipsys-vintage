import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Product } from '@/core/product';
import { cottonScarf, puffSleeveTop } from '@/fixtures/products';
import { StoreProvider } from '@/ui/store';
import { CartDrawer } from './cart-drawer';

describe('when the cart drawer is closed', () => {
  it('does not render the cart drawer', () => {
    renderCartDrawer({ isOpen: false });

    expect(queryCartDrawer()).not.toBeInTheDocument();
  });
});

describe('when the cart drawer is open', () => {
  it('renders the cart drawer', () => {
    renderCartDrawer();

    expect(getCartDrawer()).toBeInTheDocument();
  });

  it('renders the cart title', () => {
    renderCartDrawer();

    expect(getCartTitle()).toBeInTheDocument();
  });

  it('closes the cart drawer', async () => {
    const { closeCart } = renderCartDrawerWithUserActions();

    await closeCart();

    expect(queryCartDrawer()).not.toBeInTheDocument();
  });
});

describe('when the cart is empty', () => {
  it('renders the empty cart message', () => {
    renderCartDrawer({ cart: [] });

    expect(getCartIsEmptyMessage()).toBeInTheDocument();
  });

  it('does not render the cart list', () => {
    renderCartDrawer({ cart: [] });

    expect(queryCartList()).not.toBeInTheDocument();
  });
});

describe('when the cart has items', () => {
  it('renders the cart items', () => {
    renderCartDrawer({ cart: [cottonScarf, puffSleeveTop] });

    const items = getAllCartItems();

    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent(cottonScarf.name);
    expect(items[1]).toHaveTextContent(puffSleeveTop.name);
  });

  it('removes an item from the cart', async () => {
    const { removeItem } = renderCartDrawerWithUserActions({
      cart: [cottonScarf, puffSleeveTop],
    });

    await removeItem(cottonScarf);

    const items = getAllCartItems();

    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent(puffSleeveTop.name);
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

function queryCartList() {
  return screen.queryByRole('list', { name: 'פריטים בסל הקניות' });
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
  cart?: Product[];
  isOpen?: boolean;
}

function renderCartDrawerWithUserActions({ cart = [], isOpen = true }: RenderCartDrawerProps = {}) {
  const actions = setupUserActions();
  const renderResult = renderCartDrawer({ cart, isOpen });

  return { ...renderResult, ...actions };
}

function renderCartDrawer({ cart = [], isOpen = true }: RenderCartDrawerProps = {}) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <StoreProvider initialState={{ cartItems: cart, isCartDrawerOpen: isOpen }}>
      {children}
    </StoreProvider>
  );

  return render(<CartDrawer />, { wrapper });
}

function setupUserActions() {
  const user = userEvent.setup();
  const closeCart = () => user.click(getCartCloseButton());
  const removeItem = (product: Product) => user.click(getCartRemoveButton(product));

  return { closeCart, removeItem };
}
