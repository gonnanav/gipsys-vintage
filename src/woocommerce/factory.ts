import { parseEnv } from './env';
import { WooCommerceApi } from './api';

export function createWooCommerceApi() {
  const { url, customerKey, customerSecret } = parseEnv();
  const credentials = createCredentials(customerKey, customerSecret);
  const apiUrl = createApiUrl(url);

  return new WooCommerceApi(apiUrl, credentials);
}

function createCredentials(customerKey: string, customerSecret: string): string {
  return Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');
}

function createApiUrl(url: string): URL {
  return new URL('wp-json/wc/v3/', url);
}
