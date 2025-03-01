import { createApplication } from '@/composition-root';
import { ProductList } from '../../components/product-list/product-list';
import { ProductCard } from '../../components/product-card/product-card';
import { ShopLayout } from '../../components/shop-layout/shop-layout';
import { notFound } from 'next/navigation';

const app = createApplication();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const category = await app.getCategoryWithProducts(slug);
  if (!category) notFound();

  return (
    <ShopLayout title={category.name}>
      <ProductList products={category.products} ProductComponent={ProductCard} />
    </ShopLayout>
  );
}
