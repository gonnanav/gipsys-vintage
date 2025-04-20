import { wcService, fromWooCommerceProduct, parseWooCommerceProducts } from '@/services';
import { ShopPage } from '@/components/shop';
import { notFound } from 'next/navigation';
import { parseWooCommerceCategories } from '@/services';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const rawCategories = await wcService.get('products/categories', { slug });
  const wcCategories = parseWooCommerceCategories(rawCategories);
  const wcCategory = wcCategories[0];

  if (!wcCategory) notFound();

  const rawProducts = await wcService.get('products', { category: wcCategory.id.toString() });
  const wcProducts = parseWooCommerceProducts(rawProducts);
  const products = wcProducts.map(fromWooCommerceProduct);

  return <ShopPage title={wcCategory.name} products={products} />;
}
