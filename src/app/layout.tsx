import type { Metadata } from 'next';
import { createApplication } from '@/composition-root';
import { MuiProvider } from '@/components/mui-provider';
import { StoreProvider } from '@/store';
import { Header } from '@/components/header';
import { Main } from '@/components/main';
import { NavDrawer } from '@/components/nav-drawer';
import { CartDrawer } from '@/components/cart-drawer';

import './globals.css';
export const metadata: Metadata = {
  title: "Gipsy's Vintage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = createApplication();
  const categories = await app.getCategories();

  return (
    <html lang="he" dir="rtl">
      <body>
        <MuiProvider>
          <StoreProvider>
            <Header />
            <Main>{children}</Main>
            <NavDrawer categories={categories} />
            <CartDrawer />
          </StoreProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
