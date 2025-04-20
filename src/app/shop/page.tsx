import { wcService, fromWooCommerceProduct, parseProducts } from '@/services';
import { ShopPage } from '@/components/shop';

export default async function Page() {
  const rawProducts = await wcService.get('products');
  const wcProducts = parseProducts(rawProducts);
  const products = wcProducts.map(fromWooCommerceProduct);

  return <ShopPage title="חנות" products={products} />;
}
