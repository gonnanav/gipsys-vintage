import { createApplication } from '@/composition-root';
import { ProductsLayout } from './components/products-layout/products-layout';
import { ProductList } from './components/product-list/product-list';
import { ProductCard } from './components/product-card/product-card';
import { ShopLayout } from './components/shop-layout/shop-layout';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return (
    <ShopLayout title="חנות">
      <ProductsLayout>
        <ProductList products={products} ProductComponent={ProductCard} />
      </ProductsLayout>
    </ShopLayout>
  );
}
