import { createApplication } from './factory';

const app = createApplication();
const getProducts = app.getProducts.bind(app);

export { getProducts };
