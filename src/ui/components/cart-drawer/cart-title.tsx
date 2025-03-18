import Typography from '@mui/material/Typography';

export function CartTitle() {
  return (
    <Typography
      component="h2"
      variant="h6"
      data-testid="shopping-cart-title"
      sx={{ textAlign: 'center' }}
    >
      סל הקניות
    </Typography>
  );
}
