import { render, screen } from '@testing-library/react';
import { ProductList } from './product-list';
import { Product } from '@/core/product';

const ProductComponent = ({ product }: { product: Product }) => <div>{product.name}</div>;

it('renders list of products with the given component function', () => {
  const products: Product[] = [
    { id: 1, name: 'product1', slug: 'product1', price: '50' },
    { id: 2, name: 'product2', slug: 'product2', price: '100' },
  ];
  renderProductList({ products });

  screen.getByText('product1');
  screen.getByText('product2');
});

it('renders no-products message when there are no products', () => {
  renderProductList({ products: [] });

  screen.getByText('אין מוצרים זמינים');
});

function renderProductList({ products }: { products: Product[] }) {
  return render(<ProductList products={products} ProductComponent={ProductComponent} />);
}
