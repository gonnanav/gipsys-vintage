import { parseEnv } from './env';
import { WooCommerceApi } from './api';

export function createWooCommerceApi() {
  const { url, customerKey, customerSecret } = parseEnv();
  const credentials = encodeCredentials(customerKey, customerSecret);
  const apiUrl = buildApiUrl(url);

  return new WooCommerceApi(apiUrl, credentials);
}

function encodeCredentials(customerKey: string, customerSecret: string): string {
  return Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');
}

function buildApiUrl(baseUrl: string): URL {
  return new URL('wp-json/wc/v3/', baseUrl);
}
