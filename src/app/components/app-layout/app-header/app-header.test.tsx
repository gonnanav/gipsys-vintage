import { render, screen } from '@testing-library/react';
import { AppHeader } from './app-header';

it('renders the app header with the correct test id', () => {
  render(<AppHeader />);

  expect(screen.getByTestId('app-header')).toBeInTheDocument();
});
