import { createApplication } from '@/composition-root';

const app = createApplication();

export default async function Page() {
  const products = await app.getProducts();

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}
