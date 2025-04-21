export interface WooCommerceConfig {
  url: string;
  customerKey: string;
  customerSecret: string;
}

export interface WooCommerceService {
  get: (endpoint: string, searchParams?: Record<string, string>) => Promise<unknown>;
  post: (endpoint: string, body?: Record<string, unknown>) => Promise<unknown>;
}

export type FetchApi = (endpoint: string, init?: RequestInit) => Promise<unknown>;
