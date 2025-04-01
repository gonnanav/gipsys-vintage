import { render, screen, within } from '@testing-library/react';
import { Category } from '@/core/category';
import { NavDrawer } from './nav-drawer';
import { createCategory } from '@/fixtures/categories';
import userEvent from '@testing-library/user-event';

describe('when the navigation drawer is closed', () => {
  it('does not render the drawer', () => {
    renderNavDrawer({ isOpen: false });

    expect(queryNavDrawer()).not.toBeInTheDocument();
  });
});

describe('when the navigation drawer is open', () => {
  it('renders the drawer', () => {
    renderNavDrawer();

    expect(getNavDrawer()).toBeInTheDocument();
  });

  it('renders the title', () => {
    renderNavDrawer();

    expect(getNavTitle()).toBeInTheDocument();
  });

  it('renders the navigation', () => {
    renderNavDrawer();

    expect(getNavigation()).toBeInTheDocument();
  });

  it('renders the navigation list', () => {
    renderNavDrawer();

    expect(getNavigationList()).toBeInTheDocument();
  });

  it('renders the shop page link', async () => {
    renderNavDrawer();

    expect(getShopLink()).toHaveAttribute('href', '/shop');
  });

  it('renders the home page link', async () => {
    renderNavDrawer();

    expect(getHomeLink()).toHaveAttribute('href', '/');
  });

  it('renders the policy page link', async () => {
    renderNavDrawer();

    expect(getWebsitePolicyLink()).toHaveAttribute('href', '/policy');
  });

  it('renders the categories pages links', () => {
    const pantsCategory = createCategory('מכנסיים', 'pants');
    const shirtsCategory = createCategory('חולצות', 'shirts');

    renderNavDrawer({
      categories: [pantsCategory, shirtsCategory],
    });

    expect(getCategoryLink(pantsCategory)).toHaveAttribute('href', '/shop/pants');
    expect(getCategoryLink(shirtsCategory)).toHaveAttribute('href', '/shop/shirts');
  });
});

it('calls onClose when the close button is clicked', async () => {
  const user = userEvent.setup();
  const { onClose } = renderNavDrawer();

  await user.click(getCloseButton());

  expect(onClose).toHaveBeenCalled();
});

it('calls onClose when clicking on a link', async () => {
  const user = userEvent.setup();
  const { onClose } = renderNavDrawer();

  await user.click(getShopLink());

  expect(onClose).toHaveBeenCalled();
});

interface RenderNavDrawerProps {
  isOpen?: boolean;
  categories?: Category[];
}

function renderNavDrawer({ isOpen = true, categories }: RenderNavDrawerProps = {}) {
  const onClose = jest.fn();
  render(<NavDrawer categories={categories} isOpen={isOpen} onClose={onClose} />);

  return { onClose };
}

function getNavDrawer() {
  return screen.getByRole('dialog', { name: 'תפריט הניווט' });
}

function queryNavDrawer() {
  return screen.queryByRole('dialog', { name: 'תפריט הניווט' });
}

function getNavigation() {
  return within(getNavDrawer()).getByRole('navigation');
}

function getNavTitle() {
  return screen.getByRole('heading', { name: 'תפריט הניווט' });
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

function getCloseButton() {
  return within(getNavDrawer()).getByRole('button', { name: 'סגרי את תפריט הניווט' });
}

function getCategoryLink(category: Category) {
  return within(getNavigationList()).getByRole('link', { name: category.name });
}
