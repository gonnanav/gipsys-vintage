import { render, screen } from '@testing-library/react';
import { GoToShopButton } from './go-to-shop-button';

it('renders the go to shop link', () => {
  render(<GoToShopButton />);

  expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument();
});
