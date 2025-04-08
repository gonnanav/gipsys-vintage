import React from 'react';
import { Product } from '@/core/product';
import { ProductList } from './product-list/product-list';
import { ProductCard } from './product-card/product-card';
import { ShopLayout } from './shop-layout/shop-layout';

export interface ShopPageProps {
  title: string;
  products: Product[];
}

export function ShopPage({ title, products }: ShopPageProps) {
  return (
    <ShopLayout title={title}>
      <ProductList products={products} ProductComponent={ProductCard} />
    </ShopLayout>
  );
}
