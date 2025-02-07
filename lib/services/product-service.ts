import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/lib/config';

const credentials = Buffer.from(
  `${wcCustomerKey}:${wcCustomerSecret}`,
).toString('base64');

const headers = {
  Authorization: `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

export async function getProducts() {
  const response = await fetch(`${wcUrl}/wp-json/wc/v3/products`, {
    headers,
    cache: 'no-store',
  });

  return response.json();
}

export async function createProducts(products: { id: number; name: string }[]) {
  const response = await fetch(`${wcUrl}/wp-json/wc/v3/products/batch`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ create: products }),
  });

  return response.json();
}

export async function deleteProducts(ids: number[]) {
  const response = await fetch(`${wcUrl}/wp-json/wc/v3/products/batch`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ delete: ids }),
  });

  return response.json();
}
