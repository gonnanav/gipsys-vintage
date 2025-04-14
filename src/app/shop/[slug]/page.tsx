import { getCategoryWithProducts } from '@/services';
import { ShopPage } from '@/components/shop';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const category = await getCategoryWithProducts(slug);
  if (!category) notFound();

  return <ShopPage title={category.name} products={category.products} />;
}
