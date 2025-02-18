import { render, screen } from '@testing-library/react';
import { ShopLayout } from './shop-layout';

const title = 'Shop';
const childrenTestId = 'children';
const children = <div data-testid={childrenTestId} />;

it('renders title heading', () => {
  renderShopLayout();

  screen.getByRole('heading', { level: 1, name: title });
});

it('renders its children', () => {
  renderShopLayout();

  screen.getByTestId(childrenTestId);
});

function renderShopLayout() {
  render(<ShopLayout title={title}>{children}</ShopLayout>);
}
