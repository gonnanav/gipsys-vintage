import { render, screen } from '@testing-library/react';
import { ProductLayout } from './product-layout';

const title = 'Test Shop';
const childrenTestId = 'children';
const children = <div data-testid={childrenTestId} />;

it('renders title heading', () => {
  renderProductLayout();

  screen.getByRole('heading', { level: 1, name: title });
});

it('renders its children', () => {
  renderProductLayout();

  screen.getByTestId(childrenTestId);
});

function renderProductLayout() {
  render(<ProductLayout title={title}>{children}</ProductLayout>);
}
