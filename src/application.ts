import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/config';

export interface NewProduct {
  name: string;
}

export interface Product {
  id: number;
  name: string;
}

const credentials = Buffer.from(
  `${wcCustomerKey}:${wcCustomerSecret}`,
).toString('base64');

const headers = {
  Authorization: `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

const apiUrl = new URL('wp-json/wc/v3/', wcUrl);
const productsUrl = new URL('products/', apiUrl);
const productsBatchUrl = new URL('batch/', productsUrl);

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(productsUrl, {
    headers,
    cache: 'no-store',
  });

  return response.json();
}

export async function createProducts(products: NewProduct[]) {
  const response = await fetch(productsBatchUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ create: products }),
  });

  return response.json();
}

export async function deleteProducts(ids: number[]) {
  const response = await fetch(productsBatchUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ delete: ids }),
  });

  return response.json();
}
