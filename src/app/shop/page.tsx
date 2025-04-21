import { wcService } from '@/services';
import { parseProducts } from '@/parsers/product';
import { ShopPage } from '@/components/shop';

export default async function Page() {
  const rawProducts = await wcService.get('products');
  const products = parseProducts(rawProducts);

  return <ShopPage title="חנות" products={products} />;
}
