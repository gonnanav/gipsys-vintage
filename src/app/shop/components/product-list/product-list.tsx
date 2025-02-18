import { Product } from '@/application';

export type ProductListProps = {
  products: Product[];
  ProductComponent: React.FC<{ product: Product }>;
};

export function ProductList({ products, ProductComponent }: ProductListProps) {
  return products.map((product) => <ProductComponent key={product.id} product={product} />);
}
