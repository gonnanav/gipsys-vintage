import { render, screen } from '@testing-library/react';
import { ProductsLayout } from './products-layout';

it('renders its children', () => {
  const children = <div data-testid="children" />;
  render(<ProductsLayout>{children}</ProductsLayout>);

  screen.getByTestId('children');
});
