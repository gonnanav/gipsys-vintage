import { Product } from '@/application';

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const { name, price } = product;

  return (
    <>
      <h1>{name}</h1>
      <div>{`₪${price}`}</div>
    </>
  );
}
