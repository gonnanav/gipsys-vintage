import { createApplication } from '@/composition-root';
import { ShopPageView } from '@/ui/components/shop/shop-page-view/shop-page-view';
import { notFound } from 'next/navigation';

const app = createApplication();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const category = await app.getCategoryWithProducts(slug);
  if (!category) notFound();

  return <ShopPageView title={category.name} products={category.products} />;
}
