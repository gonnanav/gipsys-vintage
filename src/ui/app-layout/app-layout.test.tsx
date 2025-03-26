import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from '@/ui/store';
import { AppLayout } from './app-layout';

it('renders its children as the main content', () => {
  render(<AppLayout>App Content</AppLayout>, { wrapper: StoreProvider });

  expect(getMainContent()).toHaveTextContent('App Content');
});

it('opens the navigation drawer', async () => {
  render(<AppLayout>App Content</AppLayout>, { wrapper: StoreProvider });
  const openNavDrawer = setupOpenNavDrawer();

  await openNavDrawer();

  expect(getNavDrawer()).toBeInTheDocument();
});

it('opens the shopping cart drawer', async () => {
  render(<AppLayout>App Content</AppLayout>, { wrapper: StoreProvider });
  const openCartDrawer = setupOpenCartDrawer();

  await openCartDrawer();

  expect(getCartDrawer()).toBeInTheDocument();
});

function setupOpenNavDrawer() {
  const user = userEvent.setup();
  const openNavDrawer = () => user.click(getOpenNavigationButton());

  return openNavDrawer;
}

function setupOpenCartDrawer() {
  const user = userEvent.setup();
  const openCartDrawer = () => user.click(getOpenCartButton());

  return openCartDrawer;
}

function getHeader() {
  return screen.getByRole('banner');
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

function getMainContent() {
  return screen.getByRole('main');
}
