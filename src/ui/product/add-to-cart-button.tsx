import Button from '@mui/material/Button';
import { Product } from '@/core/product';

interface AddToCartButtonProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function AddToCartButton({ product, onAddToCart }: AddToCartButtonProps) {
  return (
    <Button onClick={() => onAddToCart(product)} variant="contained">
      הוסיפי לסל הקניות
    </Button>
  );
}
