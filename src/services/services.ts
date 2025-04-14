import { createApplication } from './factory';

const app = createApplication();
const getProducts = app.getProducts.bind(app);
const getProduct = app.getProduct.bind(app);
const getCategoryWithProducts = app.getCategoryWithProducts.bind(app);
const getCategoriesSafe = app.getCategoriesSafe.bind(app);

export { getProducts, getProduct, getCategoryWithProducts, getCategoriesSafe };
