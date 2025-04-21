import { Product } from '@/core/product';
import { parseProducts } from '@/transformers/product';
import { ShopPageProduct } from '@/components/shop';

export function parseShopPageProducts(rawProducts: unknown): ShopPageProduct[] {
  const products = parseProducts(rawProducts);

  return products.map(toShopPageProduct);
}

export function toShopPageProduct(product: Product): ShopPageProduct {
  const { id, name, slug, formattedPrice, mainImage } = product;
  const href = `/product/${slug}`;
  const price = formattedPrice;
  const imageSrc = mainImage.src;

  return { id, name, imageSrc, href, price };
}
