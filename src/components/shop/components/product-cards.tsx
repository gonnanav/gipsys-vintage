import { ProductsLayout } from './products-layout';
import { ProductCard } from './product-card';
import { ShopPageProduct } from '@/components/shop';

interface ProductCardsProps {
  products: ShopPageProduct[];
}

export function ProductCards({ products }: ProductCardsProps) {
  return (
    <ProductsLayout>
      {products.map(({ id, ...rest }) => (
        <ProductCard key={id} {...rest} />
      ))}
    </ProductsLayout>
  );
}
