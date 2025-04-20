import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface ProductDetailsProps {
  name: string;
  price: string;
  description: string;
}

export function ProductDetails({ name, price, description }: ProductDetailsProps) {
  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <ProductTitle name={name} />
        <ProductPrice price={price} />
      </Stack>
      {description && <ProductDescription description={description} />}
    </Stack>
  );
}

interface ProductTitleProps {
  name: string;
}

function ProductTitle({ name }: ProductTitleProps) {
  return <Typography variant="h1">{name}</Typography>;
}

interface ProductPriceProps {
  price: string;
}

function ProductPrice({ price }: ProductPriceProps) {
  return (
    <Typography component="p" variant="h5" sx={{ fontWeight: 'bold' }}>
      ₪{price}
    </Typography>
  );
}

interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <Typography
      component="div"
      variant="body1"
      color="text.secondary"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
