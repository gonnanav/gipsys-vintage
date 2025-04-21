import { NavCategory } from './types';
import { Header } from './header';
import { Main } from './components/main';
import { NavDrawer } from './nav';
import { CartDrawer } from './cart';

export interface AppLayoutProps {
  categories?: NavCategory[];
  children: React.ReactNode;
}

export function AppLayout({ categories, children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <NavDrawer categories={categories} />
      <CartDrawer />
    </>
  );
}
