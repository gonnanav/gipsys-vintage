import { Product } from '@/core/product';
import { ProductLayout } from './components/layout';
import { ProductGallery } from './gallery';
import { ProductDetails } from './components/details';
import { AddToCartButton } from './components/add-to-cart-button';

interface ProductPageProps {
  product: Product;
}

export function ProductPage({ product }: ProductPageProps) {
  const { name, price, description, images } = product;

  return (
    <ProductLayout
      productGallery={<ProductGallery productImages={images} />}
      productDetails={<ProductDetails name={name} price={price} description={description} />}
      addToCartButton={<AddToCartButton product={product} />}
    />
  );
}
