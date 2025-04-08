import { Product } from '@/core/product';
import { ShopLayout } from './shop-layout';
import { ProductsLayout } from './products-layout';
import { NoProductsMessage } from './no-products-message';
import { ProductCard, ProductCardProps } from './product-card';

export interface ShopPageProps {
  title: string;
  products: Product[];
}

export function ShopPage({ title, products }: ShopPageProps) {
  const hasProducts = products.length > 0;

  return (
    <ShopLayout title={title}>
      {hasProducts ? renderProducts(products) : <NoProductsMessage />}
    </ShopLayout>
  );
}

function renderProducts(products: Product[]) {
  return (
    <ProductsLayout>
      {products.map((product) => (
        <ProductCard key={product.id} {...toProductCardProps(product)} />
      ))}
    </ProductsLayout>
  );
}

function toProductCardProps(product: Product): ProductCardProps {
  const { name, slug, price, images } = product;
  const href = `/product/${slug}`;
  const image = images && images[0];
  const src = image?.src || '/images/product-placeholder.webp';
  const priceShekels = `₪${price}`;

  return { name, src, href, price: priceShekels };
}
