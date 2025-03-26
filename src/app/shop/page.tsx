import { createApplication } from '@/composition-root';
import { ShopPage } from '@/ui/shop';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return <ShopPage title="חנות" products={products} />;
}
