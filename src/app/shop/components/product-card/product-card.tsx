import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Product } from '@/application';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, slug, price, images } = product;
  const image = images && images[0];
  const src = image?.src || 'placeholder.webp';
  const priceShekels = `₪${price}`;

  return (
    <Card component="article" variant="outlined" data-testid="product-card">
      <CardActionArea component={Link} href={`/shop/${slug}`}>
        <CardMedia
          title={name}
          image={src}
          sx={{ width: '100%', height: 0, paddingBottom: '133%' }}
          data-testid="product-card-image"
        />
        <CardContent>
          <Typography component="h2" variant="body1">
            {name}
          </Typography>
          <Typography variant="body2">{priceShekels}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
