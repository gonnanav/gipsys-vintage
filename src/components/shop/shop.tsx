import { ShopLayout } from './components/shop-layout';
import { ProductCards } from './components/product-cards';
import { NoProductsMessage } from './components/no-products-message';

export interface ShopPageProps {
  title: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  imageSrc: string;
  href: string;
  price: string;
}

export function ShopPage({ title, products }: ShopPageProps) {
  const hasProducts = products.length > 0;

  return (
    <ShopLayout title={title}>
      {hasProducts ? <ProductCards products={products} /> : <NoProductsMessage />}
    </ShopLayout>
  );
}
