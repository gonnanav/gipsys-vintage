import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { NavigationButton } from './navigation-button';
import { CartButton } from './cart-button';

export function Header() {
  return (
    <Stack
      component="header"
      direction="row"
      spacing={{ xs: 2, sm: 3 }}
      sx={{ height: { xs: 60, sm: 80, md: 100 }, alignItems: 'center', px: { xs: 2, sm: 3 } }}
    >
      <NavigationButton />
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src="/images/logo.webp"
          alt="Gipsy's Vintage Logo"
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <CartButton />
    </Stack>
  );
}
