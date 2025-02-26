export interface WooCommerceApi {
  fetch<T>(config: WooCommerceRequestConfig): Promise<T>;
}

export interface WooCommerceRequestConfig {
  method?: string;
  endpoint: string;
  searchParams?: URLSearchParams;
  body?: unknown;
  cache?: RequestCache;
}
