import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';

export function GoToShopButton() {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button component={Link} href="/shop" variant="contained" color="primary" size="large">
        SHOP NOW
      </Button>
    </Box>
  );
}
