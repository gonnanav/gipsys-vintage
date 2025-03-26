import { notFound } from 'next/navigation';
import { createApplication } from '@/composition-root';
import { ProductPageView } from '@/ui/product/product-page-view/product-page-view';

const app = createApplication();

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await app.getProduct(slug);
  if (!product) notFound();

  return <ProductPageView product={product} />;
}
