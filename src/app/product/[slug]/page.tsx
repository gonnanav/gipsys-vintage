import { notFound } from 'next/navigation';
import { createApplication } from '@/composition-root';
import { ProductLayout } from './components/product-layout/product-layout';
import { ProductGallery } from './components/product-gallery/product-gallery';
import { ProductDetails } from './components/product-details/product-details';

const app = createApplication();

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await app.getProduct(slug);
  if (!product) notFound();

  return (
    <ProductLayout
      productGallery={<ProductGallery productImages={product.images} />}
      productDetails={<ProductDetails product={product} />}
    />
  );
}
