import { GoToShopButton, HeroImage } from '@/ui/home';
import Box from '@mui/material/Box';

export function HomePage() {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1.5,
      }}
    >
      <HeroImage />
      <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <GoToShopButton />
      </Box>
    </Box>
  );
}
