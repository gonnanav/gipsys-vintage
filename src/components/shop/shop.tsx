import { Product } from '@/core/product';
import { ShopLayout } from './components/shop-layout';
import { ProductsLayout } from './components/products-layout';
import { NoProductsMessage } from './components/no-products-message';
import { ProductCard, ProductCardProps } from './components/product-card';

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
  const { name, slug, formattedPrice, mainImage } = product;
  const href = `/product/${slug}`;
  const price = formattedPrice;
  const src = mainImage.src;

  return { name, src, href, price };
}
