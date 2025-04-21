import { FetchApi } from './types';

export function createFetchApi(apiUrl: URL, credentials: string): FetchApi {
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
