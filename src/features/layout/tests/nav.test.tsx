import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Category } from '@/core/category';
import { AppState } from '@/features/store';
import { renderAppLayout } from './test-utils';
import { createCategory } from '@/fixtures/categories';
import { AppLayoutProps } from '../layout';

it('opens the navigation drawer when clicking the open navigation button', async () => {
  const user = userEvent.setup();
  renderAppLayout();

  await user.click(getOpenNavigationButton());

  expect(getNavDrawer()).toBeInTheDocument();
});

it('closes the navigation drawer when clicking the close navigation button', async () => {
  const user = userEvent.setup();
  renderWithNavOpen();

  await user.click(getCloseNavigationButton());

  expect(queryNavDrawer()).not.toBeInTheDocument();
});

it('renders the navigation title', () => {
  renderWithNavOpen();

  expect(getNavTitle()).toBeInTheDocument();
});

it('renders the shop page link', async () => {
  renderWithNavOpen();

  expect(getShopLink()).toHaveAttribute('href', '/shop');
});

it('renders the home page link', async () => {
  renderWithNavOpen();

  expect(getHomeLink()).toHaveAttribute('href', '/');
});

it('renders the policy page link', async () => {
  renderWithNavOpen();

  expect(getWebsitePolicyLink()).toHaveAttribute('href', '/policy');
});

it('renders the categories pages links', () => {
  const pantsCategory = createCategory('מכנסיים', 'pants');
  const shirtsCategory = createCategory('חולצות', 'shirts');

  renderWithNavOpen({}, { categories: [pantsCategory, shirtsCategory] });

  expect(getCategoryLink(pantsCategory)).toHaveAttribute('href', '/shop/pants');
  expect(getCategoryLink(shirtsCategory)).toHaveAttribute('href', '/shop/shirts');
});

function renderWithNavOpen(initialState?: Partial<AppState>, props?: Partial<AppLayoutProps>) {
  renderAppLayout({ isNavDrawerOpen: true, ...initialState }, props);
}

const navDrawerSelector = ['dialog', { name: 'תפריט הניווט' }] as const;

function getNavDrawer() {
  return screen.getByRole(...navDrawerSelector);
}

function queryNavDrawer() {
  return screen.queryByRole(...navDrawerSelector);
}

function getNavTitle() {
  return screen.getByText('תפריט הניווט');
}

function getOpenNavigationButton() {
  return screen.getByRole('button', { name: 'פתחי את תפריט הניווט' });
}

function getCloseNavigationButton() {
  return screen.getByRole('button', { name: 'סגרי את תפריט הניווט' });
}

function getShopLink() {
  return screen.getByRole('link', { name: 'חנות' });
}

function getHomeLink() {
  return screen.getByRole('link', { name: 'עמוד הבית' });
}

function getWebsitePolicyLink() {
  return screen.getByRole('link', { name: 'תקנון האתר' });
}

function getCategoryLink(category: Category) {
  return screen.getByRole('link', { name: category.name });
}
