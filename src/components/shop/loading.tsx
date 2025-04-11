import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { ShopLayout } from './components/shop-layout';
import { ProductsLayout } from './components/products-layout';

export function ShopPageLoading() {
  return (
    <ShopLayout title="חנות">
      <ProductsLayout>
        {Array.from({ length: 6 }).map((_, i) => (
          <Box key={i} sx={{ width: '400px', aspectRatio: '3 / 4' }}>
            <Skeleton variant="rounded" sx={{ height: '100%' }} />
          </Box>
        ))}
      </ProductsLayout>
    </ShopLayout>
  );
}
