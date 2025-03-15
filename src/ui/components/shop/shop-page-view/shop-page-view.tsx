import React from 'react';
import { Product } from '@/core/product';
import { ProductList } from '../product-list/product-list';
import { ProductCard } from '../product-card/product-card';
import { ShopLayout } from '../shop-layout/shop-layout';

interface ShopPageViewProps {
  title: string;
  products: Product[];
}

export function ShopPageView({ title, products }: ShopPageViewProps) {
  return (
    <ShopLayout title={title}>
      <ProductList products={products} ProductComponent={ProductCard} />
    </ShopLayout>
  );
}
