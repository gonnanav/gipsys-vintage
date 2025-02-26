import { Product } from '@/core/product';
import { ProductLayout } from '../product-layout/product-layout';
import { ProductGallery } from '../product-gallery/product-gallery';
import { ProductDetails } from '../product-details/product-details';

interface ProductPageViewProps {
  product: Product;
}

export function ProductPageView({ product }: ProductPageViewProps) {
  return (
    <ProductLayout
      productGallery={<ProductGallery productImages={product.images} />}
      productDetails={<ProductDetails product={product} />}
    />
  );
}
