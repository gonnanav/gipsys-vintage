import { notFound } from 'next/navigation';
import { wcService } from '@/services';
import { parseFirstProduct } from '@/transformers/product';
import { ProductPage } from '@/components/product';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const rawProducts = await wcService.get('products', { slug });
  const product = parseFirstProduct(rawProducts);

  if (!product) notFound();

  return <ProductPage product={product} />;
}
