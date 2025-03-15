'use client';

import Button from '@mui/material/Button';
import { Product } from '@/core/product';
import { useShoppingCart } from '@/ui/providers/shopping-cart/shopping-cart-provider';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addProduct } = useShoppingCart();

  return (
    <Button
      data-testid="add-to-cart-button"
      onClick={() => addProduct(product)}
      variant="contained"
    >
      הוסיפי לסל הקניות
    </Button>
  );
}
