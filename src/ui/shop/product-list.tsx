import { Product } from '@/core/product';
import { ProductsLayout } from './products-layout';
import { NoProductsMessage } from './no-products-message';

export type ProductListProps = {
  products: Product[];
  ProductComponent: React.FC<{ product: Product }>;
};

export function ProductList({ products, ProductComponent }: ProductListProps) {
  if (!products.length) return <NoProductsMessage />;

  return (
    <ProductsLayout>
      {products.map((product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
    </ProductsLayout>
  );
}
