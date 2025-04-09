import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from '@/ui/store';
import { AppLayout, AppLayoutProps } from './app-layout';

it('renders the header with the logo', () => {
  renderAppLayout();

  expect(getHeaderLogo()).toBeInTheDocument();
});

it('renders the main content', () => {
  renderAppLayout({ children: <div>Main Content</div> });

  expect(getMain()).toHaveTextContent('Main Content');
});

it('opens the navigation drawer', async () => {
  const { openNavDrawer } = renderAppLayoutWithUserActions();

  await openNavDrawer();

  expect(getNavDrawer()).toBeInTheDocument();
});

function renderAppLayout(props: Partial<AppLayoutProps> = {}) {
  return render(<AppLayout {...props}>{props.children}</AppLayout>, { wrapper: StoreProvider });
}

function renderAppLayoutWithUserActions(props: Partial<AppLayoutProps> = {}) {
  const userActions = setupUserActions();
  const renderResult = renderAppLayout(props);

  return { ...renderResult, ...userActions };
}

function setupUserActions() {
  const user = userEvent.setup();
  const openNavDrawer = () => user.click(getOpenNavigationButton());
  const openCartDrawer = () => user.click(getOpenCartButton());

  return { openNavDrawer, openCartDrawer };
}

function getHeader() {
  return screen.getByRole('banner');
}

function getHeaderLogo() {
  return within(getHeader()).getByRole('img', { name: "Gipsy's Vintage Logo" });
}

function getMain() {
  return screen.getByRole('main');
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
