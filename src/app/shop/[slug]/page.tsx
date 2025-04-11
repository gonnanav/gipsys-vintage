import { createApplication } from '@/application-factory';
import { ShopPage } from '@/components/shop';
import { notFound } from 'next/navigation';

const app = createApplication();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const category = await app.getCategoryWithProducts(slug);
  if (!category) notFound();

  return <ShopPage title={category.name} products={category.products} />;
}
