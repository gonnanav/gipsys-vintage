import { Product } from '@/core/product';
import { ProductLayout } from './product-layout/product-layout';
import { ProductGallery } from './product-gallery/product-gallery';
import { ProductDetails } from './product-details/product-details';
import { AddToCartButton } from './add-to-cart-button/add-to-cart-button';

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
