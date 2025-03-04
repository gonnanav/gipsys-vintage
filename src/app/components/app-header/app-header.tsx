import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { ShoppingCart } from '../shopping-cart/shopping-cart';

export function AppHeader() {
  return (
    <Stack
      component="header"
      data-testid="app-header"
      direction="row"
      sx={{ height: { xs: 60, sm: 80, md: 100 } }}
    >
      <Box
        data-testid="app-header-logo"
        sx={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <Image
          src="/images/logo.webp"
          alt="Gipsy's Vintage Logo"
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <ShoppingCart />
    </Stack>
  );
}
