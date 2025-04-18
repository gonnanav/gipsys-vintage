import { parseEnv } from './env';
import { createWooCommerceService } from './woocommerce';
import { Application } from './application';

const env = parseEnv();
const wcService = createWooCommerceService({
  url: env.WOOCOMMERCE_URL,
  customerKey: env.WOOCOMMERCE_CUSTOMER_KEY,
  customerSecret: env.WOOCOMMERCE_CUSTOMER_SECRET,
});
const app = new Application(wcService);

const getProducts = app.getProducts.bind(app);
const getProduct = app.getProduct.bind(app);
const getCategoryWithProducts = app.getCategoryWithProducts.bind(app);
const getCategoriesSafe = app.getCategoriesSafe.bind(app);
const replaceAllProducts = app.replaceAllProducts.bind(app);
const replaceAllCategories = app.replaceAllCategories.bind(app);

export {
  getProducts,
  getProduct,
  getCategoryWithProducts,
  getCategoriesSafe,
  replaceAllProducts,
  replaceAllCategories,
};
