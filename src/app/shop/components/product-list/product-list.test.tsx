import { render, screen } from '@testing-library/react';
import { ProductList, ProductListProps } from './product-list';
import { Product } from '@/application';

const ProductComponent = ({ product }: { product: Product }) => <div>{product.name}</div>;

it('renders no-products message when products are empty', () => {
  renderProductList({ products: [] });

  screen.getByRole('heading', {
    level: 2,
    name: 'נראה שאין מוצרים זמינים כרגע. שווה לנסות שוב מאוחר יותר.',
  });
});

it('renders list of products with given component function', () => {
  const products: Product[] = [
    { id: 1, name: 'product1', slug: 'product1', price: '50' },
    { id: 2, name: 'product2', slug: 'product2', price: '100' },
  ];

  renderProductList({ products });

  screen.getByText('product1');
  screen.getByText('product2');
});

function renderProductList({ products = [] }: Partial<ProductListProps>) {
  render(<ProductList products={products} ProductComponent={ProductComponent} />);
}
