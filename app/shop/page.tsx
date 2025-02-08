import { getProducts } from '@/lib/services/product-service';

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}
