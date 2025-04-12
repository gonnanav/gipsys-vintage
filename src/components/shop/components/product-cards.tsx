import { Product } from '@/core/product';
import { ProductsLayout } from './products-layout';
import { ProductCard, ProductCardProps } from './product-card';

interface ProductCardsProps {
  products: Product[];
}

export function ProductCards({ products }: ProductCardsProps) {
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
