import { Product } from '@/core/product';
import { ShopLayout } from './components/shop-layout';
import { ProductCards } from './components/product-cards';
import { NoProductsMessage } from './components/no-products-message';

export interface ShopPageProps {
  title: string;
  products: Product[];
}

export function ShopPage(props: ShopPageProps) {
  const { title } = props;
  const products = props.products.map(toProps);
  const hasProducts = products.length > 0;

  return (
    <ShopLayout title={title}>
      {hasProducts ? <ProductCards products={products} /> : <NoProductsMessage />}
    </ShopLayout>
  );
}

function toProps(product: Product) {
  const { id, name, slug, formattedPrice, mainImage } = product;
  const href = `/product/${slug}`;
  const price = formattedPrice;
  const imageSrc = mainImage.src;

  return { id, name, imageSrc, href, price };
}
