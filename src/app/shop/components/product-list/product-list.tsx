import { Product } from '@/application';
import { ProductsLayout } from '../products-layout/products-layout';

export type ProductListProps = {
  products: Product[];
  ProductComponent: React.FC<{ product: Product }>;
};

export function ProductList({ products, ProductComponent }: ProductListProps) {
  return (
    <ProductsLayout>
      {products.map((product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
    </ProductsLayout>
  );
}
