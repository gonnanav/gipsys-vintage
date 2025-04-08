import { Product } from '@/core/product';
import { ShopLayout } from './shop-layout';
import { ProductsLayout } from './products-layout';
import { NoProductsMessage } from './no-products-message';
import { ProductCard } from './product-card';

export interface ShopPageProps {
  title: string;
  products: Product[];
}

export function ShopPage({ title, products }: ShopPageProps) {
  const hasProducts = products.length > 0;

  return (
    <ShopLayout title={title}>
      {hasProducts ? renderProducts(products) : <NoProductsMessage />}
    </ShopLayout>
  );
}

function renderProducts(products: Product[]) {
  return (
    <ProductsLayout>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductsLayout>
  );
}
