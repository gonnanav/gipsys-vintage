import { Product } from '@/core/product';
import { ProductLayout } from './components/layout';
import { ProductGallery } from './gallery';
import { ProductDetails } from './components/details';
import { AddToCartButton } from './components/add-to-cart-button';

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
