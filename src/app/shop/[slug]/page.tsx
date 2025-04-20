import { wcService, fromWooCommerceProduct, parseProducts } from '@/services';
import { ShopPage } from '@/components/shop';
import { notFound } from 'next/navigation';
import { parseCategories } from '@/services/woocommerce/category';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const rawCategories = await wcService.get('products/categories', { slug });
  const wcCategories = parseCategories(rawCategories);
  const wcCategory = wcCategories[0];

  if (!wcCategory) notFound();

  const rawProducts = await wcService.get('products', { category: wcCategory.id.toString() });
  const wcProducts = parseProducts(rawProducts);
  const products = wcProducts.map(fromWooCommerceProduct);

  return <ShopPage title={wcCategory.name} products={products} />;
}
