import { Application } from '@/application';
import * as wc from '@/woocommerce';

const app = new Application(wc);

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
