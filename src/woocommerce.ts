import { wcUrl, wcCustomerKey, wcCustomerSecret } from '@/config';
import { Product, NewProduct } from '@/application';

const credentials = Buffer.from(`${wcCustomerKey}:${wcCustomerSecret}`).toString('base64');

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

export async function replaceAllProducts(newProducts: NewProduct[]): Promise<Product[]> {
  const oldProducts = await getProducts();
  const oldProductIds = oldProducts.map((product) => product.id);

  const response = await fetch(productsBatchUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ delete: oldProductIds, create: newProducts }),
  });
  const data = await response.json();

  return data.create;
}
