import { parseEnv } from './env';
import { WooCommerceApi } from './api';

export function createWooCommerceApi() {
  const { url, customerKey, customerSecret } = parseEnv();
  const credentials = createCredentials(customerKey, customerSecret);

  return new WooCommerceApi(url, credentials);
}

function createCredentials(customerKey: string, customerSecret: string): string {
  return Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');
}
