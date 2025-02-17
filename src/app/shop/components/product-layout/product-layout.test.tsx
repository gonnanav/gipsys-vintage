import { render, screen } from '@testing-library/react';
import { ProductLayout } from './product-layout';

it('renders its children', () => {
  const children = <div data-testid="children" />;
  render(<ProductLayout>{children}</ProductLayout>);

  screen.getByTestId('children');
});
