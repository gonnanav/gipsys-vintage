import Typography from '@mui/material/Typography';
import { Product } from '@/core/product';
import { ProductsLayout } from '../products-layout/products-layout';

export type ProductListProps = {
  products: Product[];
  ProductComponent: React.FC<{ product: Product }>;
};

export function ProductList({ products, ProductComponent }: ProductListProps) {
  if (!products.length) {
    return <Typography sx={{ textAlign: 'center' }}>אין מוצרים זמינים</Typography>;
  }

  return (
    <ProductsLayout>
      {products.map((product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
    </ProductsLayout>
  );
}
