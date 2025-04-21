import { ProductsLayout } from './products-layout';
import { ProductCard } from './product-card';

interface Product {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  href: string;
}

interface ProductCardsProps {
  products: Product[];
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
