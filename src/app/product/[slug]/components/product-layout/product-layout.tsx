import { ReactElement } from 'react';
import Grid from '@mui/material/Grid2';

interface ProductLayoutProps {
  productGallery: ReactElement;
  productDetails: ReactElement;
}

export function ProductLayout({ productGallery, productDetails }: ProductLayoutProps) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid size={{ xs: 12, md: 6 }}>{productGallery}</Grid>
      <Grid size={{ xs: 12, md: 6 }}>{productDetails}</Grid>
    </Grid>
  );
}
