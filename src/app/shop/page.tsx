import { createApplication } from '@/application-factory';
import { ShopPage } from '@/components/shop';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return <ShopPage title="חנות" products={products} />;
}
