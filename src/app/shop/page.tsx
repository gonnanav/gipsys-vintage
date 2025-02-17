import { createApplication } from '@/composition-root';
import { ProductCard } from './components/product-card';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
