import { Product } from '@/core/product';
import { ProductLayout } from './product-layout/product-layout';
import { ProductGallery } from './product-gallery/product-gallery';
import { ProductDetails } from './product-details';
import { AddToCartButtonAdapter } from './add-to-cart-button';

interface ProductPageProps {
  product: Product;
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <ProductLayout
      productGallery={<ProductGallery productImages={product.images} />}
      productDetails={<ProductDetails product={product} />}
      addToCartButton={<AddToCartButtonAdapter product={product} />}
    />
  );
}
