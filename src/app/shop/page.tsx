import { createApplication } from '@/composition-root';
import { ShopPageView } from '@/ui/components/shop/shop-page-view/shop-page-view';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return <ShopPageView title="חנות" products={products} />;
}
