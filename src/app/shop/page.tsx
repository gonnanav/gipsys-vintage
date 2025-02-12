import { Application } from '@/application';
import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/config';
import { WooCommerceAdapter } from '@/woocommerce';

const wc = new WooCommerceAdapter(wcUrl, wcCustomerKey, wcCustomerSecret);
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
