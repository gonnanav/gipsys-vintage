import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from '@/store';
import { Header } from './header';
import { NavDrawer } from '../nav-drawer/nav-drawer';
import { CartDrawer } from '../cart-drawer/cart-drawer';

it('renders the logo', () => {
  render(<Header />, { wrapper: StoreProvider });

  expect(getLogo()).toBeInTheDocument();
});

it('opens the navigation drawer', async () => {
  const { openNavDrawer } = renderHeaderWithDrawers();

  await openNavDrawer();

  expect(getNavDrawer()).toBeInTheDocument();
});

it('opens the shopping cart drawer', async () => {
  const { openCartDrawer } = renderHeaderWithDrawers();

  await openCartDrawer();

  expect(getCartDrawer()).toBeInTheDocument();
});

function renderHeaderWithDrawers() {
  const user = userEvent.setup();
  const openNavDrawer = () => user.click(getOpenNavigationButton());
  const openCartDrawer = () => user.click(getOpenCartButton());

  render(
    <StoreProvider>
      <Header />
      <NavDrawer />
      <CartDrawer />
    </StoreProvider>,
  );

  return { user, openNavDrawer, openCartDrawer };
}

function getHeader() {
  return screen.getByRole('banner');
}

function getLogo() {
  return within(getHeader()).getByRole('img', { name: "Gipsy's Vintage Logo" });
}

function getOpenNavigationButton() {
  return within(getHeader()).getByRole('button', { name: 'פתחי את תפריט הניווט' });
}

function getOpenCartButton() {
  return within(getHeader()).getByRole('button', { name: 'פתחי את סל הקניות' });
}

function getNavDrawer() {
  return screen.getByRole('dialog', { name: 'תפריט הניווט' });
}

function getCartDrawer() {
  return screen.getByRole('dialog', { name: 'סל הקניות' });
}
