import { notFound } from 'next/navigation';
import { wcService } from '@/services';
import { parseFirstCategory } from '@/transformers/category';
import { parseProducts } from '@/transformers/product';
import { ShopPage } from '@/components/shop';
import { Product } from '@/core/product';

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
  const products = parseProducts(rawProducts);
  const shopPageProducts = products.map(toProps);

  return <ShopPage title={name} products={shopPageProducts} />;
}

function toProps(product: Product) {
  const { id, name, slug, formattedPrice, mainImage } = product;
  const href = `/product/${slug}`;
  const price = formattedPrice;
  const imageSrc = mainImage.src;

  return { id, name, imageSrc, href, price };
}
