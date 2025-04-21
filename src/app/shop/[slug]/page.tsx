import { notFound } from 'next/navigation';
import { wcService } from '@/services';
import { parseFirstCategory } from '@/transformers/category';
import { ShopPage } from '@/components/shop';
import { parseShopPageProducts } from '@/transformers/shop';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const rawCategories = await wcService.get('products/categories', { slug });
  const category = parseFirstCategory(rawCategories);

  if (!category) notFound();

  const { id, name } = category;
  const rawProducts = await wcService.get('products', { category: id.toString() });
  const products = parseShopPageProducts(rawProducts);

  return <ShopPage title={name} products={products} />;
}
