import { render, screen } from '@testing-library/react';
import { AppLayout } from './app-layout';

const childTestId = 'child';

it('renders its children', () => {
  renderAppLayout();

  expect(screen.getByTestId(childTestId)).toBeInTheDocument();
});

it('renders the main content', () => {
  renderAppLayout();

  expect(screen.getByRole('main')).toBeInTheDocument();
});

it('renders the app header', () => {
  renderAppLayout();

  expect(screen.getByTestId('app-header')).toBeInTheDocument();
});

function renderAppLayout() {
  return render(
    <AppLayout>
      <div data-testid={childTestId} />
    </AppLayout>,
  );
}
