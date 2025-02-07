import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/lib/config';

const credentials = Buffer.from(
  `${wcCustomerKey}:${wcCustomerSecret}`,
).toString('base64');

const headers = {
  Authorization: `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

export async function getProducts() {
  const productsResponse = await fetch(`${wcUrl}/wp-json/wc/v3/products`, {
    headers,
    cache: 'no-store',
  });

  return productsResponse.json();
}

export async function deleteProducts(ids: number[]) {
  const deleteRequest = await fetch(`${wcUrl}/wp-json/wc/v3/products/batch`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ delete: ids }),
  });

  return deleteRequest.json();
}
