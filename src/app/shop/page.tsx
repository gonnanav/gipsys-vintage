import { createApplication } from '@/composition-root';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProductLayout } from './components/product-layout/product-layout';
import { ProductCard } from './components/product-card/product-card';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return (
    <Box>
      <Typography variant="h1" align="center">
        חנות
      </Typography>
      <ProductLayout>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductLayout>
    </Box>
  );
}
