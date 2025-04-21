import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export interface ProductCardProps {
  name: string;
  price: string;
  imageSrc: string;
  href: string;
}

export function ProductCard({ name, price, imageSrc, href }: ProductCardProps) {
  return (
    <Card component="article" variant="outlined">
      <CardActionArea component={Link} href={href}>
        <CardMedia
          title={name}
          image={imageSrc}
          sx={{ width: '100%', height: 0, paddingBottom: '133%' }}
        />
        <CardContent>
          <Typography component="h2" variant="body1">
            {name}
          </Typography>
          <Typography variant="body2">{price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
