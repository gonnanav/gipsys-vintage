import { notFound } from 'next/navigation';
import { getProduct } from '@/services';
import { ProductPage } from '@/components/product';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await getProduct(slug);
  if (!product) notFound();

  return <ProductPage product={product} />;
}
