import { createApplication } from '@/composition-root';
import { ProductCard } from './components/product-card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return (
    <Box>
      <Typography variant="h1" align="center">
        חנות
      </Typography>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}
