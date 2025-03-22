import { render, screen, within } from '@testing-library/react';
import { StoreProvider } from '@/store';
import { NavDrawer } from './nav-drawer';
import userEvent from '@testing-library/user-event';

it('renders nothing when the drawer is closed', () => {
  const { container } = renderNavDrawer({ isOpen: false });

  expect(container).toBeEmptyDOMElement();
});

it('closes the drawer when the close button is clicked', async () => {
  const user = userEvent.setup();
  renderNavDrawer();

  await user.click(getCloseButton());

  expect(queryNavigationDrawer()).not.toBeInTheDocument();
});

it('renders the drawer modal', () => {
  renderNavDrawer();

  expect(getNavigationDrawer()).toHaveAttribute('aria-modal', 'true');
});

it('renders the navigation menu', () => {
  renderNavDrawer();

  expect(getNavigationMenu()).toBeInTheDocument();
});

it('renders the navigation list', () => {
  renderNavDrawer();

  expect(getNavigationList()).toBeInTheDocument();
});

it('renders the link to the shop page', async () => {
  renderNavDrawer();

  expect(getShopLink()).toHaveAttribute('href', '/shop');
});

it('renders the link to the home page', async () => {
  renderNavDrawer();

  expect(getHomeLink()).toHaveAttribute('href', '/');
});

it('closes the drawer when clicking on a link', async () => {
  const user = userEvent.setup();
  renderNavDrawer();

  await user.click(getShopLink());

  expect(queryNavigationDrawer()).not.toBeInTheDocument();
});

interface RenderNavDrawerProps {
  isOpen?: boolean;
}

function renderNavDrawer({ isOpen = true }: RenderNavDrawerProps = {}) {
  return render(
    <StoreProvider initialState={{ isNavDrawerOpen: isOpen }}>
      <NavDrawer />
    </StoreProvider>,
  );
}

function getNavigationDrawer() {
  return screen.getByRole('dialog', { name: 'תפריט הניווט' });
}

function queryNavigationDrawer() {
  return screen.queryByRole('dialog', { name: 'תפריט הניווט' });
}

function getNavigationMenu() {
  return within(getNavigationDrawer()).getByRole('navigation');
}

function getNavigationList() {
  return within(getNavigationMenu()).getByRole('list');
}

function getShopLink() {
  return within(getNavigationList()).getByRole('link', { name: 'חנות' });
}

function getHomeLink() {
  return within(getNavigationList()).getByRole('link', { name: 'עמוד הבית' });
}

function getCloseButton() {
  return within(getNavigationDrawer()).getByRole('button', { name: 'סגרי את תפריט הניווט' });
}
