import { FetchApi, WooCommerceService } from './types';
import { buildEndpoint } from './utils';

export function createService(fetchApi: FetchApi): WooCommerceService {
  async function get(endpoint: string, searchParams?: Record<string, string>) {
    return fetchApi(buildEndpoint(endpoint, searchParams));
  }

  async function post(endpoint: string, body?: Record<string, unknown>) {
    return fetchApi(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body && JSON.stringify(body),
    });
  }

  return { get, post };
}
