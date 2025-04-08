import { render, screen, within } from '@testing-library/react';
import { cottonScarf, leatherJacket } from '@/fixtures/products';
import { ShopPage, ShopPageProps } from './shop-page';

it('renders the shop page title', () => {
  renderShopPage({ title: 'My Shop' });

  expect(getTitle('My Shop')).toBeInTheDocument();
});

it('renders the no-products message when there are no products', () => {
  renderShopPage({ products: [] });

  expect(getNoProductsMessage()).toBeInTheDocument();
});

it('renders a product card for each product', () => {
  renderShopPage({ products: [cottonScarf, leatherJacket] });

  const productCards = getAllProductCards();

  expect(productCards).toHaveLength(2);
  expect(productCards[0]).toHaveTextContent(cottonScarf.name);
  expect(productCards[1]).toHaveTextContent(leatherJacket.name);
});

it("renders a product card with the product's name, price, and image", () => {
  renderShopPage({ products: [leatherJacket] });

  const productCard = getAllProductCards()[0];
  expect(productCard).toHaveTextContent(leatherJacket.name);
  expect(productCard).toHaveTextContent(leatherJacket.price);
  expect(getProductCardImage(productCard, leatherJacket.name)).toBeInTheDocument();
});

function renderShopPage(props: Partial<ShopPageProps>) {
  const defaultProps: ShopPageProps = {
    title: 'Shop',
    products: [],
  };

  render(<ShopPage {...defaultProps} {...props} />);
}

function getTitle(name: string) {
  return screen.getByRole('heading', { level: 1, name });
}

function getNoProductsMessage() {
  return screen.getByText('אין מוצרים זמינים');
}

function getAllProductCards() {
  return screen.getAllByRole('article');
}

function getProductCardImage(productCard: HTMLElement, name: string) {
  return within(productCard).getByRole('img', { name });
}
