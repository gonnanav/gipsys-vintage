import { parseEnv } from './env';
import { WooCommerceApi } from './api';

export function createWooCommerceApi() {
  const { url, customerKey, customerSecret } = parseEnv();
  const credentials = encodeCredentials(customerKey, customerSecret);
  const apiUrl = buildApiUrl(url);
  const fetchApi = createFetchApi(apiUrl, credentials);

  return new WooCommerceApi(fetchApi);
}

interface ApiEndpoint {
  endpoint: string;
  searchParams?: Record<string, string>;
}

function createFetchApi(apiUrl: URL, credentials: string) {
  const defaultHeaders = {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json',
  };

  return async function fetchApi<T>(
    { endpoint, searchParams }: ApiEndpoint,
    init?: RequestInit,
  ): Promise<T> {
    const endpointUrl = buildEndpointUrl(apiUrl, endpoint, searchParams);

    const response = await fetch(endpointUrl, {
      cache: 'no-store',
      ...init,
      headers: {
        ...defaultHeaders,
        ...init?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpointUrl}`, {
        cause: response,
      });
    }

    return response.json();
  };
}

function encodeCredentials(customerKey: string, customerSecret: string): string {
  return Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');
}

function buildApiUrl(baseUrl: string): URL {
  return new URL('wp-json/wc/v3/', baseUrl);
}

function buildEndpointUrl(
  apiUrl: URL,
  endpoint: string,
  searchParams?: Record<string, string>,
): URL {
  if (!searchParams) return new URL(endpoint, apiUrl);

  const endpointWithParams = `${endpoint}?${new URLSearchParams(searchParams).toString()}`;
  return new URL(endpointWithParams, apiUrl);
}
