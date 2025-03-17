'use client';

import Button from '@mui/material/Button';
import { Product } from '@/core/product';
import { useAddItemToCart } from '@/ui/hooks/cart';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItemToCart = useAddItemToCart();

  return (
    <Button
      data-testid="add-to-cart-button"
      onClick={() => addItemToCart(product)}
      variant="contained"
    >
      הוסיפי לסל הקניות
    </Button>
  );
}
