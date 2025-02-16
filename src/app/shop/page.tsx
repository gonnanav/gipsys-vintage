import { createApplication } from '@/composition-root';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <div>{product.name}</div>
          <div>{product.price}</div>
        </div>
      ))}
    </>
  );
}
