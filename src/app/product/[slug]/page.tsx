import { notFound } from 'next/navigation';
import { createApplication } from '@/composition-root';
import { ProductDetails } from './components/product-details/product-details';
import { ProductGallery } from './components/product-gallery/product-gallery';

const app = createApplication();

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await app.getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProductGallery productImages={product.images} />
      <ProductDetails product={product} />
    </>
  );
}
