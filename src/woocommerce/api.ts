export interface WooCommerceApi {
  fetch<T>(endpoint: string, config?: WooCommerceRequestConfig): Promise<T>;
}

export interface WooCommerceRequestConfig {
  method?: string;
  searchParams?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
}
