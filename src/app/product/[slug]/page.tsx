import { notFound } from 'next/navigation';
import { createApplication } from '@/application-factory';
import { ProductPage } from '@/ui/product';

const app = createApplication();

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await app.getProduct(slug);
  if (!product) notFound();

  return <ProductPage product={product} />;
}
