import { Product } from '@/core/product';
import { wcService } from '@/services';
import { parseProducts } from '@/transformers/product';
import { ShopPage } from '@/components/shop';

export default async function Page() {
  const rawProducts = await wcService.get('products');
  const products = parseProducts(rawProducts);
  const shopPageProducts = products.map(toProps);

  return <ShopPage title="חנות" products={shopPageProducts} />;
}

function toProps(product: Product) {
  const { id, name, slug, formattedPrice, mainImage } = product;
  const href = `/product/${slug}`;
  const price = formattedPrice;
  const imageSrc = mainImage.src;

  return { id, name, imageSrc, href, price };
}
