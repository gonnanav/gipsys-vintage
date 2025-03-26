import { render, screen, within } from '@testing-library/react';
import { StoreProvider } from '@/ui/store';
import { Header } from './header';

it('renders the logo', () => {
  render(<Header />, { wrapper: StoreProvider });

  expect(getLogo()).toBeInTheDocument();
});

function getHeader() {
  return screen.getByRole('banner');
}

function getLogo() {
  return within(getHeader()).getByRole('img', { name: "Gipsy's Vintage Logo" });
}
