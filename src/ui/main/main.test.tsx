import { render, screen, within } from '@testing-library/react';
import { Main } from './main';

it('renders its children as the main content', () => {
  render(
    <Main>
      <div data-testid="children" />
    </Main>,
  );

  expect(within(screen.getByRole('main')).getByTestId('children')).toBeInTheDocument();
});
