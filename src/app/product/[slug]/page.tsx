import { notFound } from 'next/navigation';
import { ProductPage } from '@/components/product';
import { wcService, parseProducts, fromWooCommerceProduct } from '@/services';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const rawProducts = await wcService.get('products', { slug });

  const wcProducts = parseProducts(rawProducts);
  const products = wcProducts.map(fromWooCommerceProduct);
  const product = products[0] ?? null;

  if (!product) notFound();

  return <ProductPage product={product} />;
}
