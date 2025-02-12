const envNames = {
  wcUrl: 'WOOCOMMERCE_URL',
  wcCustomerKey: 'WOOCOMMERCE_CUSTOMER_KEY',
  wcCustomerSecret: 'WOOCOMMERCE_CUSTOMER_SECRET',
};

const envValues = Object.fromEntries(
  Object.entries(envNames).map(([key, val]) => [key, getEnvVar(val)]),
);

export const { wcUrl, wcCustomerKey, wcCustomerSecret } = envValues;

function getEnvVar(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}
