import { render, screen } from '@testing-library/react';
import { AppHeader } from './app-header';
import { StoreProvider } from '@/store';

it('renders the app header with the correct test id', () => {
  renderAppHeader();

  expect(screen.getByTestId('app-header')).toBeInTheDocument();
});

it('renders the app header logo with the correct test id', () => {
  renderAppHeader();

  expect(screen.getByTestId('app-header-logo')).toBeInTheDocument();
});

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

function renderAppHeader() {
  return render(<AppHeader />, { wrapper: StoreProvider });
}
