import { Category } from '@/core/category';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { NavDrawer } from '@/components/nav-drawer';
import { CartDrawer } from '@/components/cart-drawer';

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
