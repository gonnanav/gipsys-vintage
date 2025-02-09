import { NewProduct, Product } from '@/domain/product';
import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/config';

const credentials = Buffer.from(
  `${wcCustomerKey}:${wcCustomerSecret}`,
).toString('base64');

const headers = {
  Authorization: `Basic ${credentials}`,
  'Content-Type': 'application/json',
};

const productsUrl = `${wcUrl}/wp-json/wc/v3/products`;

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(productsUrl, {
    headers,
    cache: 'no-store',
  });

  return response.json();
}

export async function createProducts(products: NewProduct[]) {
  const response = await fetch(`${productsUrl}/batch`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ create: products }),
  });

  return response.json();
}

export async function deleteProducts(ids: number[]) {
  const response = await fetch(`${productsUrl}/batch`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ delete: ids }),
  });

  return response.json();
}
