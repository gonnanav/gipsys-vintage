'use client';

import { useCartActions } from '@/ui/store';
import { AddToCartButton } from './add-to-cart-button';
import { Product } from '@/core/product';

export interface AddToCartButtonAdapterProps {
  product: Product;
}

export function AddToCartButtonAdapter({ product }: AddToCartButtonAdapterProps) {
  const { addItem } = useCartActions();

  return <AddToCartButton product={product} onAddToCart={addItem} />;
}
