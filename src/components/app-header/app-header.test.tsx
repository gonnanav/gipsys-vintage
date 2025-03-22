import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppHeader } from './app-header';
import { StoreProvider } from '@/store';
import { NavDrawer } from '../nav-drawer/nav-drawer';

it('renders a banner', () => {
  renderAppHeader();

  expect(screen.getByRole('banner')).toBeInTheDocument();
});

it('renders the app header logo with the logo image', () => {
  renderAppHeader();

  expect(screen.getByRole('img', { name: "Gipsy's Vintage Logo" })).toBeInTheDocument();
});

it('renders the shopping cart button', () => {
  renderAppHeader();

  expect(screen.getByRole('button', { name: 'פתחי את סל הקניות' })).toBeInTheDocument();
});

it('opens the navigation drawer when the navigation button is clicked', async () => {
  const { user } = renderAppHeaderWithNavDrawer();

  await user.click(screen.getByRole('button', { name: 'פתחי את תפריט הניווט' }));

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

function renderAppHeader() {
  return render(<AppHeader />, { wrapper: StoreProvider });
}

function renderAppHeaderWithNavDrawer() {
  const user = userEvent.setup();

  render(
    <StoreProvider>
      <AppHeader />
      <NavDrawer />
    </StoreProvider>,
  );

  return { user };
}
