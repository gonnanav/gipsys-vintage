interface WooCommerceConfig {
  url: string;
  customerKey: string;
  customerSecret: string;
}

export interface WooCommerceService {
  get: (endpoint: string, searchParams?: Record<string, string>) => Promise<unknown>;
  post: (endpoint: string, body?: Record<string, unknown>) => Promise<unknown>;
}

export function createWooCommerceService({
  url,
  customerKey,
  customerSecret,
}: WooCommerceConfig): WooCommerceService {
  const credentials = encodeCredentials(customerKey, customerSecret);
  const apiUrl = buildApiUrl(url);
  const fetchApi = createFetchApi(apiUrl, credentials);

  return createService(fetchApi);
}

type FetchApi = (endpoint: string, init?: RequestInit) => Promise<unknown>;

function createService(fetchApi: FetchApi): WooCommerceService {
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

function createFetchApi(apiUrl: URL, credentials: string): FetchApi {
  return async (endpoint: string, init?: RequestInit): Promise<unknown> => {
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
