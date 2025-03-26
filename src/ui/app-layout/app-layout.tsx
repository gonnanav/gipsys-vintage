import { Category } from '@/core/category';
import { Header } from '@/ui/header';
import { Main } from '@/ui/main';
import { NavDrawer } from '@/ui/nav-drawer';
import { CartDrawer } from '@/ui/cart-drawer';

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
