import Image from 'next/image';
import Box from '@mui/material/Box';

export function ProductGallery() {
  return (
    <Box
      data-testid="product-gallery"
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3 / 4',
      }}
    >
      <Image alt="אין תמונת מוצר" src="/placeholder.webp" fill style={{ objectFit: 'contain' }} />
    </Box>
  );
}
