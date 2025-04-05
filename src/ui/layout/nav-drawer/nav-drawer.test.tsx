import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Category } from '@/core/category';
import { NavDrawer } from './nav-drawer';

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

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const { onClose } = renderNavDrawer();

    await user.click(getCloseButton());

    expect(onClose).toHaveBeenCalled();
  });
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

function getNavTitle() {
  return screen.getByRole('heading', { name: 'תפריט הניווט' });
}

function getCloseButton() {
  return within(getNavDrawer()).getByRole('button', { name: 'סגרי את תפריט הניווט' });
}
