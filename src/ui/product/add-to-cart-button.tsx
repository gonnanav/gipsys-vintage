'use client';

import Button from '@mui/material/Button';
import { Product } from '@/core/product';
import { useCartActions } from '@/ui/store';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartActions();

  return (
    <Button onClick={() => addItem(product)} variant="contained">
      הוסיפי לסל הקניות
    </Button>
  );
}
