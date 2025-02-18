import { createApplication } from '@/composition-root';
import { ProductLayout } from './components/product-layout/product-layout';
import { ProductCard } from './components/product-card/product-card';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return (
    <ProductLayout title="חנות">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductLayout>
  );
}
