import { wcService } from '@/services';
import { ShopPage } from '@/components/shop';
import { parseShopPageProducts } from '@/transformers/shop';

export default async function Page() {
  const rawProducts = await wcService.get('products');
  const products = parseShopPageProducts(rawProducts);

  return <ShopPage title="חנות" products={products} />;
}
