import { StoreProvider } from '@/store';
import { render, screen } from '@testing-library/react';
import { NavDrawer } from './nav-drawer';

it('does not render the navigation drawer when closed', () => {
  render(
    <StoreProvider initialState={{ isNavDrawerOpen: false }}>
      <NavDrawer />
    </StoreProvider>,
  );

  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

it('renders the navigation drawer when open', () => {
  render(
    <StoreProvider initialState={{ isNavDrawerOpen: true }}>
      <NavDrawer />
    </StoreProvider>,
  );

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
