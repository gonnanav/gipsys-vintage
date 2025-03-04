import { render, screen } from '@testing-library/react';
import { AppHeader } from './app-header';

it('renders the app header with the correct test id', () => {
  render(<AppHeader />);

  expect(screen.getByTestId('app-header')).toBeInTheDocument();
});

it('renders the app header logo with the correct test id', () => {
  render(<AppHeader />);

  expect(screen.getByTestId('app-header-logo')).toBeInTheDocument();
});

it('renders a banner', () => {
  render(<AppHeader />);

  expect(screen.getByRole('banner')).toBeInTheDocument();
});

it('renders the app header logo with the logo image', () => {
  render(<AppHeader />);

  expect(screen.getByRole('img', { name: "Gipsy's Vintage Logo" })).toBeInTheDocument();
});

it('renders the shopping cart button', () => {
  render(<AppHeader />);

  expect(screen.getByRole('button', { name: 'פתחי את סל הקניות' })).toBeInTheDocument();
});
