import { render, screen, within } from '@testing-library/react';
import { Category } from '@/core/category';
import { StoreProvider } from '@/ui/store';
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

it('closes the drawer when the close button is clicked', async () => {
  const user = userEvent.setup();
  renderNavDrawer();

  await user.click(getCloseButton());

  expect(queryNavDrawer()).not.toBeInTheDocument();
});

it('closes the drawer when clicking on a link', async () => {
  const user = userEvent.setup();
  renderNavDrawer();

  await user.click(getShopLink());

  expect(queryNavDrawer()).not.toBeInTheDocument();
});

interface RenderNavDrawerProps {
  isOpen?: boolean;
  categories?: Category[];
}

function renderNavDrawer({ isOpen = true, categories }: RenderNavDrawerProps = {}) {
  return render(
    <StoreProvider initialState={{ isNavDrawerOpen: isOpen }}>
      <NavDrawer categories={categories} />
    </StoreProvider>,
  );
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
