import { createApplication } from './factory';
import { parseEnv } from './env';

const env = parseEnv();
const app = createApplication({
  woocommerceUrl: env.WOOCOMMERCE_URL,
  woocommerceCustomerKey: env.WOOCOMMERCE_CUSTOMER_KEY,
  woocommerceCustomerSecret: env.WOOCOMMERCE_CUSTOMER_SECRET,
});

const getProducts = app.getProducts.bind(app);
const getProduct = app.getProduct.bind(app);
const getCategoryWithProducts = app.getCategoryWithProducts.bind(app);
const getCategoriesSafe = app.getCategoriesSafe.bind(app);

export { getProducts, getProduct, getCategoryWithProducts, getCategoriesSafe };
