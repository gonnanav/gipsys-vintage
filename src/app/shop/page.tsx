import { getProducts } from '@/services';
import { ShopPage } from '@/components/shop';

export default async function Page() {
  const products = await getProducts();

  return <ShopPage title="חנות" products={products} />;
}
