import { render, screen } from '@testing-library/react';
import { SideDrawerLayout, SideDrawerLayoutProps } from './side-drawer-layout';
import userEvent from '@testing-library/user-event';

it('renders nothing when the drawer is closed', () => {
  const { container } = renderSideDrawer({ isOpen: false });

  expect(container).toBeEmptyDOMElement();
});

it('renders the drawer as a dialog modal', () => {
  renderSideDrawer({ title: 'Title' });

  expect(screen.getByRole('dialog', { name: 'Title' })).toHaveAttribute('aria-modal', 'true');
});

it('renders its children', () => {
  renderSideDrawer({ children: <div>Children</div> });

  expect(screen.getByText('Children')).toBeInTheDocument();
});

it('calls the close callback when the close button is clicked', async () => {
  const onClose = jest.fn();
  const user = userEvent.setup();
  renderSideDrawer({ isOpen: true, onClose, closeButtonName: 'Close' });

  await user.click(screen.getByRole('button', { name: 'Close' }));

  expect(onClose).toHaveBeenCalled();
});

it('renders the title', () => {
  renderSideDrawer({ title: 'Title' });

  expect(screen.getByText('Title')).toBeInTheDocument();
});

function renderSideDrawer(props: Partial<SideDrawerLayoutProps> = {}) {
  return render(
    <SideDrawerLayout
      isOpen={true}
      title={'Title'}
      onClose={jest.fn()}
      closeButtonName={'Close'}
      {...props}
    >
      {props.children}
    </SideDrawerLayout>,
  );
}
