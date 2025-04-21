export function encodeCredentials(customerKey: string, customerSecret: string): string {
  return Buffer.from(`${customerKey}:${customerSecret}`).toString('base64');
}

export function buildApiUrl(baseUrl: string): URL {
  return new URL('wp-json/wc/v3/', baseUrl);
}

export function buildEndpoint(endpoint: string, searchParams?: Record<string, string>): string {
  if (!searchParams) return endpoint;

  const searchParamsString = new URLSearchParams(searchParams).toString();
  return `${endpoint}?${searchParamsString}`;
}
