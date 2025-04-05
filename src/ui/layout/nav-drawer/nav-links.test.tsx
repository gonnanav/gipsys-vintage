import { render, screen, within } from '@testing-library/react';
import { Category } from '@/core/category';
import { createCategory } from '@/fixtures/categories';
import userEvent from '@testing-library/user-event';
import { NavLinks } from './nav-links';

it('renders the shop page link', async () => {
  renderNavLinks();

  expect(getShopLink()).toHaveAttribute('href', '/shop');
});

it('renders the home page link', async () => {
  renderNavLinks();

  expect(getHomeLink()).toHaveAttribute('href', '/');
});

it('renders the policy page link', async () => {
  renderNavLinks();

  expect(getWebsitePolicyLink()).toHaveAttribute('href', '/policy');
});

it('renders the categories pages links', () => {
  const pantsCategory = createCategory('מכנסיים', 'pants');
  const shirtsCategory = createCategory('חולצות', 'shirts');

  renderNavLinks({
    categories: [pantsCategory, shirtsCategory],
  });

  expect(getCategoryLink(pantsCategory)).toHaveAttribute('href', '/shop/pants');
  expect(getCategoryLink(shirtsCategory)).toHaveAttribute('href', '/shop/shirts');
});

it('calls onClose when clicking on a link', async () => {
  const user = userEvent.setup();
  const { onClose } = renderNavLinks();

  await user.click(getShopLink());

  expect(onClose).toHaveBeenCalled();
});

interface RenderNavLinksProps {
  categories?: Category[];
}

function renderNavLinks({ categories }: RenderNavLinksProps = {}) {
  const onClose = jest.fn();
  render(<NavLinks categories={categories} onClose={onClose} />);

  return { onClose };
}

function getNavigation() {
  return screen.getByRole('navigation');
}

function getNavigationList() {
  return within(getNavigation()).getByRole('list', { name: 'תפריט הניווט' });
}

function getShopLink() {
  return within(getNavigationList()).getByRole('link', { name: 'חנות' });
}

function getHomeLink() {
  return within(getNavigationList()).getByRole('link', { name: 'עמוד הבית' });
}

function getWebsitePolicyLink() {
  return within(getNavigationList()).getByRole('link', { name: 'תקנון האתר' });
}

function getCategoryLink(category: Category) {
  return within(getNavigationList()).getByRole('link', { name: category.name });
}
