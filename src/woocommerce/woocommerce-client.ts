export interface WooCommerceRequestConfig {
  method?: string;
  endpoint: string;
  searchParams?: URLSearchParams;
  body?: unknown;
  cache?: RequestCache;
}

export class WooCommerceClient {
  private readonly headers: Record<string, string>;
  private readonly apiUrl: URL;

  constructor(url: string, customerKey: string, customerSecret: string) {
    const credentials = Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');

    this.headers = {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    };

    this.apiUrl = new URL('wp-json/wc/v3/', url);
  }

  async fetch<T>(config: WooCommerceRequestConfig): Promise<T> {
    const { method = 'GET', endpoint, searchParams, body, cache = 'no-store' } = config;
    
    let url = new URL(endpoint, this.apiUrl);
    if (searchParams) {
      url = new URL(`${endpoint}?${searchParams.toString()}`, this.apiUrl);
    }

    const response = await fetch(url, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
      cache,
    });

    return response.json();
  }
}
