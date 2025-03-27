import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

export function ProductPageLoading() {
  return (
    <Container sx={{ width: '100%', aspectRatio: '3 / 4' }}>
      <Skeleton variant="rounded" sx={{ height: '100%' }} />
    </Container>
  );
}
