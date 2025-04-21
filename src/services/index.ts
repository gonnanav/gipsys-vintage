import { parseEnv } from './env';
import { encodeCredentials, buildApiUrl } from './utils';
import { createFetchApi } from './fetch-api';
import { createService } from './woocommerce';

const env = parseEnv();

const credentials = encodeCredentials(
  env.WOOCOMMERCE_CUSTOMER_KEY,
  env.WOOCOMMERCE_CUSTOMER_SECRET,
);
const apiUrl = buildApiUrl(env.WOOCOMMERCE_URL);
const fetchApi = createFetchApi(apiUrl, credentials);

export const wcService = createService(fetchApi);
