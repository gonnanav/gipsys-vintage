const customerKey = process.env['WC_CUSTOMER_KEY'];
if (!customerKey) {
  throw new Error('Missing WooCommerce customer key');
}

const customerSecret = process.env['WC_CUSTOMER_SECRET'];
if (!customerSecret) {
  throw new Error('Missing WooCommerce customer secret');
}

const credentials = Buffer.from(`${customerKey}:${customerSecret}`).toString(
  'base64',
);

const headers = {
  Authorization: `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

export default async function Page() {
  const productsResponse = await fetch(
    'https://gipsys-vintage.local/wp-json/wc/v3/products',
    {
      headers,
      cache: 'no-store',
    },
  );
  const products = await productsResponse.json();

  return (
    <>
      {products.map((product: { name: string; id: number }) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}
