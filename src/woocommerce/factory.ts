import { parseEnv } from './env';
import { WooCommerceApi } from './api';

export function createWooCommerceApi() {
  const { url, customerKey, customerSecret } = parseEnv();
  const credentials = encodeCredentials(customerKey, customerSecret);
  const apiUrl = buildApiUrl(url);
  const fetchApi = createFetchApi(apiUrl, credentials);
  const { get, post } = createApi(fetchApi);

  return new WooCommerceApi(get, post);
}

type FetchApi = <T>(endpoint: string, init?: RequestInit) => Promise<T>;

function createApi(fetchApi: FetchApi) {
  async function get<T>({
    endpoint,
    searchParams,
  }: {
    endpoint: string;
    searchParams?: Record<string, string>;
  }) {
    return fetchApi<T>(buildEndpoint(endpoint, searchParams));
  }

  async function post<T>({ endpoint, body }: { endpoint: string; body?: Record<string, unknown> }) {
    return fetchApi<T>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body && JSON.stringify(body),
    });
  }

  return { get, post };
}

function createFetchApi(apiUrl: URL, credentials: string): FetchApi {
  return async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
    const endpointUrl = new URL(endpoint, apiUrl);

    const response = await fetch(endpointUrl, {
      cache: 'no-store',
      ...init,
      headers: {
        Authorization: `Basic ${credentials}`,
        ...init?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${endpointUrl}`);
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

function buildEndpoint(endpoint: string, searchParams?: Record<string, string>): string {
  if (!searchParams) return endpoint;

  const searchParamsString = new URLSearchParams(searchParams).toString();
  return `${endpoint}?${searchParamsString}`;
}
