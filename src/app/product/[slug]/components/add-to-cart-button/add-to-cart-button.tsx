'use client';

import Button from '@mui/material/Button';
import { useContext } from 'react';
import { ShoppingCartContext } from '@/app/contexts';

export function AddToCartButton() {
  const { onAddProduct } = useContext(ShoppingCartContext);

  return (
    <Button data-testid="add-to-cart-button" onClick={onAddProduct} variant="contained">
      הוסיפי לסל הקניות
    </Button>
  );
}
