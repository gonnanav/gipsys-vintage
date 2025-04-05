import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavDrawer } from './nav-drawer';

describe('when the navigation drawer is closed', () => {
  it('does not render the drawer', () => {
    renderNavDrawer({ isOpen: false });

    expect(queryNavDrawer()).not.toBeInTheDocument();
  });
});

describe('when the navigation drawer is open', () => {
  it('renders the drawer content', () => {
    renderNavDrawer({ children: <div>Drawer Content</div> });

    expect(getNavDrawer()).toHaveTextContent('Drawer Content');
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
  children?: React.ReactNode;
}

function renderNavDrawer({ isOpen = true, children }: RenderNavDrawerProps = {}) {
  const onClose = jest.fn();
  render(
    <NavDrawer isOpen={isOpen} onClose={onClose}>
      {children}
    </NavDrawer>,
  );

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
