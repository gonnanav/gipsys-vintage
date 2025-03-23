import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

it('renders the go to shop link', () => {
  render(<Home />);

  expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument();
});

it('renders the hero image', () => {
  render(<Home />);

  expect(screen.getByRole('img', { name: `תמונה ראשית של ג'יפסיז וינטג'` })).toBeInTheDocument();
});
