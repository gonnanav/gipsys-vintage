import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { placeholderImage } from '@/core/product';
import { createProduct } from '@/fixtures/products';
import { cottonScarf, puffSleeveTop } from '@/fixtures/products';
import { AppState } from '@/ui/store';
import { renderAppLayout } from './test-utils';

it('opens the cart drawer when clicking the open cart button', async () => {
  const user = userEvent.setup();
  renderAppLayout({ isCartDrawerOpen: false });

  await user.click(getOpenCartButton());

  expect(getCartDrawer()).toBeInTheDocument();
});

it('closes the cart drawer when clicking the close cart button', async () => {
  const user = userEvent.setup();
  renderWithCartOpen();

  await user.click(getCloseCartButton());

  expect(queryCartDrawer()).not.toBeInTheDocument();
});

it('renders the cart title', () => {
  renderWithCartOpen();

  expect(getCartTitle()).toBeInTheDocument();
});

it('renders the empty cart message instead of the cart items when the cart is empty', () => {
  renderWithCartOpen({ cartItems: [] });

  expect(getEmptyCartMessage()).toBeInTheDocument();
  expect(queryCartList()).not.toBeInTheDocument();
});

it('renders the cart items when the cart is not empty', () => {
  renderWithCartOpen({ cartItems: [cottonScarf, puffSleeveTop] });

  const items = getAllCartItems();
  expect(items[0]).toHaveTextContent(cottonScarf.name);
  expect(items[1]).toHaveTextContent(puffSleeveTop.name);
});

it('removes a cart item when clicking the remove button', async () => {
  const user = userEvent.setup();
  renderWithCartOpen({ cartItems: [cottonScarf, puffSleeveTop] });

  const [cottonScarfItem, puffSleeveTopItem] = getAllCartItems();
  await user.click(getCartItemRemoveButton(cottonScarfItem));

  expect(cottonScarfItem).not.toBeInTheDocument();
  expect(puffSleeveTopItem).toBeInTheDocument();
});

it('renders a cart item with its name, price, and main image', () => {
  const image = { src: '/product.webp', alt: 'Summer Top Image' };
  const product = createProduct({ name: 'Summer Top', price: '100', images: [image] });
  renderWithCartOpen({ cartItems: [product] });

  const item = getAllCartItems()[0];
  expect(item).toHaveTextContent('Summer Top');
  expect(item).toHaveTextContent('100');
  expect(within(item).getByRole('img', { name: 'Summer Top Image' })).toBeInTheDocument();
});

it('renders a cart item with a placeholder image if the product has no images', () => {
  const product = createProduct({ images: [] });
  renderWithCartOpen({ cartItems: [product] });

  const item = getAllCartItems()[0];
  expect(within(item).getByRole('img', { name: placeholderImage.alt })).toBeInTheDocument();
});

function renderWithCartOpen(initialState?: Partial<AppState>) {
  renderAppLayout({ isCartDrawerOpen: true, ...initialState });
}

function getOpenCartButton() {
  return screen.getByRole('button', { name: 'פתחי את סל הקניות' });
}

const cartDrawerSelector = ['dialog', { name: 'סל הקניות' }] as const;

function getCartDrawer() {
  return screen.getByRole(...cartDrawerSelector);
}

function queryCartDrawer() {
  return screen.queryByRole(...cartDrawerSelector);
}

function getCartTitle() {
  return screen.getByRole('heading', { name: 'סל הקניות' });
}

function getCloseCartButton() {
  return screen.getByRole('button', { name: 'סגרי את עגלת הקניות' });
}

function getCartList() {
  return screen.getByRole('list', { name: 'פריטים בסל הקניות' });
}

function getAllCartItems() {
  return within(getCartList()).getAllByRole('listitem');
}

function getCartItemRemoveButton(item: HTMLElement) {
  return within(item).getByRole('button', { name: 'הסירי מסל הקניות' });
}

function queryCartList() {
  return screen.queryByRole('list', { name: 'פריטים בסל הקניות' });
}

function getEmptyCartMessage() {
  return screen.getByText('אין פריטים בסל');
}
