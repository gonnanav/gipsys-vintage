import { Category } from '@/core/category';
import { Header } from './header';
import { Main } from './main';
import { NavDrawer } from './nav';
import { CartDrawer } from './cart';

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
      <CartDrawer />
    </>
  );
}
