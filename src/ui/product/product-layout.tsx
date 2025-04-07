import { ReactElement } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

interface ProductLayoutProps {
  productGallery: ReactElement;
  productDetails: ReactElement;
  addToCartButton: ReactElement;
}

export function ProductLayout({
  productGallery,
  productDetails,
  addToCartButton,
}: ProductLayoutProps) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid size={{ xs: 12, md: 6 }}>{productGallery}</Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        {productDetails}
        <Box sx={{ mt: 3 }}>{addToCartButton}</Box>
      </Grid>
    </Grid>
  );
}
