import { render, screen, within } from '@testing-library/react';
import { StoreProvider } from '@/ui/store';
import { Header } from './header';

it('renders the navigation button', () => {
  renderHeader();

  expect(getNavButton()).toBeInTheDocument();
});

it('renders the logo image', () => {
  renderHeader();

  expect(getLogoImage()).toBeInTheDocument();
});

it('renders the cart button', () => {
  renderHeader();

  expect(getCartButton()).toBeInTheDocument();
});

function renderHeader() {
  return render(<Header />, { wrapper: StoreProvider });
}

function getHeader() {
  return screen.getByRole('banner');
}

function getNavButton() {
  return within(getHeader()).getByRole('button', { name: 'פתחי את תפריט הניווט' });
}

function getLogoImage() {
  return within(getHeader()).getByRole('img', { name: "Gipsy's Vintage Logo" });
}

function getCartButton() {
  return within(getHeader()).getByRole('button', { name: 'פתחי את סל הקניות' });
}
