import { Category } from '@/core/category';
import { Header } from './header';
import { Main } from './main';
import { NavDrawer } from './nav-drawer';
import { CartDrawerAdapter } from './cart-drawer';

export interface AppLayoutProps {
  categories?: Category[];
  children: React.ReactNode;
}

export function AppLayout({ categories, children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <NavDrawer categories={categories} />
      <CartDrawerAdapter />
    </>
  );
}
