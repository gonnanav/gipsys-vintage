export interface WooCommerceApi {
  fetch<T>(endpoint: string, config?: WooCommerceRequestConfig): Promise<T>;
}

export interface WooCommerceRequestConfig {
  method?: string;
  searchParams?: URLSearchParams;
  body?: unknown;
  cache?: RequestCache;
}
