import { Application, ECommercePort } from './application';

const portProducts = [
  { id: 1, name: 'product1' },
  { id: 2, name: 'product2' },
];

it('calls getProducts on e-commerce port and returns its result', async () => {
  const { app, port } = setupApplication();

  const appProducts = await app.getProducts();

  expect(port.getProducts).toHaveBeenCalled();
  expect(appProducts).toEqual(portProducts);
});

it('rejects when getProducts on e-commerce port rejects', async () => {
  const getProducts = jest.fn().mockRejectedValue('error');
  const { app } = setupApplication({ getProducts });

  const productsPromise = app.getProducts();

  await expect(productsPromise).rejects.toMatch('error');
});

it('calls replaceAllProducts on e-commerce port and returns its result', async () => {
  const { app, port } = setupApplication();

  // Dummy input array: the return value is predefined by the mock
  const appProducts = await app.replaceAllProducts([]);

  expect(port.replaceAllProducts).toHaveBeenCalled();
  expect(appProducts).toEqual(portProducts);
});

it('rejects when replaceAllProducts on e-commerce port rejects', async () => {
  const replaceAllProducts = jest.fn().mockRejectedValue('error');
  const { app } = setupApplication({ replaceAllProducts });

  // Dummy input array: the promise is predefined to reject by the mock
  const createdProductsPromise = app.replaceAllProducts([]);

  await expect(createdProductsPromise).rejects.toMatch('error');
});

type ApplicationSetup = {
  app: Application;
  port: ECommercePort;
};

function setupApplication(partialPort?: Partial<ECommercePort>): ApplicationSetup {
  const defaultPort = {
    getProducts: jest.fn().mockResolvedValue(portProducts),
    replaceAllProducts: jest.fn().mockResolvedValue(portProducts),
  };

  const port = {
    ...defaultPort,
    ...partialPort,
  };
  const app = new Application(port);

  return { app, port };
}
