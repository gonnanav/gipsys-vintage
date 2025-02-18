import { Product } from '@/application';

export type ProductListProps = {
  products: Product[];
  ProductComponent: React.FC<{ product: Product }>;
};

export function ProductList({ products, ProductComponent }: ProductListProps) {
  if (!products.length) return <h2>נראה שאין מוצרים זמינים כרגע. שווה לנסות שוב מאוחר יותר.</h2>;

  return (
    <>
      {products.map((product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
    </>
  );
}
