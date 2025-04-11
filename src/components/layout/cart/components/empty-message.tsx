import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function CartEmptyMessage() {
  return (
    <Stack spacing={2} alignItems="center">
      <ShoppingCartIcon sx={{ fontSize: '3rem' }} />
      <Typography sx={{ textAlign: 'center' }}>אין פריטים בסל</Typography>
    </Stack>
  );
}
