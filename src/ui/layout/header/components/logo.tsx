import Image from 'next/image';
import Box from '@mui/material/Box';

export function LogoImage() {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        src="/images/logo.webp"
        alt="Gipsy's Vintage Logo"
        fill
        priority
        style={{ objectFit: 'contain' }}
      />
    </Box>
  );
}
