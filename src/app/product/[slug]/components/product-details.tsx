import { Product } from '@/application';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const { name, price, description } = product;

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h1">{name}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          ₪{price}
        </Typography>
      </Stack>
      {description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
          }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
}
