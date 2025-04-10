import { render, screen, within } from '@testing-library/react';
import { StoreProvider } from '@/ui/store';
import { AppLayout, AppLayoutProps } from '../app-layout';

it('renders the header with the logo', () => {
  renderAppLayout();

  expect(getHeaderLogo()).toBeInTheDocument();
});

it('renders the main content', () => {
  renderAppLayout({ children: <div>Main Content</div> });

  expect(getMain()).toHaveTextContent('Main Content');
});

function renderAppLayout(props: Partial<AppLayoutProps> = {}) {
  return render(<AppLayout {...props}>{props.children}</AppLayout>, { wrapper: StoreProvider });
}

function getHeader() {
  return screen.getByRole('banner');
}

function getHeaderLogo() {
  return within(getHeader()).getByRole('img', { name: "Gipsy's Vintage Logo" });
}

function getMain() {
  return screen.getByRole('main');
}
