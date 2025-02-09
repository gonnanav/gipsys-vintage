export const wcUrl = process.env['WC_URL'];
if (!wcUrl) {
  throw new Error('Missing WooCommerce API URL');
}

export const wcCustomerKey = process.env['WC_CUSTOMER_KEY'];
if (!wcCustomerKey) {
  throw new Error('Missing WooCommerce customer key');
}

export const wcCustomerSecret = process.env['WC_CUSTOMER_SECRET'];
if (!wcCustomerSecret) {
  throw new Error('Missing WooCommerce customer secret');
}
