import { render, screen } from '@testing-library/react';
import { HomePage } from '@/components/home-page';

it('renders the go to shop link', () => {
  render(<HomePage />);

  expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument();
});

it('renders the hero image', () => {
  render(<HomePage />);

  expect(screen.getByRole('img', { name: `תמונה ראשית של ג'יפסיז וינטג'` })).toBeInTheDocument();
});
