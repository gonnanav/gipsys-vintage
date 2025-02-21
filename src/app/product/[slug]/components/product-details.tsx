import { Product } from '@/application';

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const { name, price, description } = product;

  return (
    <>
      <h1>{name}</h1>
      <div>{`₪${price}`}</div>
      {description && <div>{description}</div>}
    </>
  );
}
