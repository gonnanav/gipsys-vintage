import { Product } from '@/core/product';
import { ProductLayout } from './product-layout';
import { ProductGallery } from './gallery';
import { ProductDetails } from './product-details';
import { AddToCartButton } from './add-to-cart-button';

interface ProductPageProps {
  product: Product;
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <ProductLayout
      productGallery={<ProductGallery productImages={product.images} />}
      productDetails={<ProductDetails product={product} />}
      addToCartButton={<AddToCartButton product={product} />}
    />
  );
}
