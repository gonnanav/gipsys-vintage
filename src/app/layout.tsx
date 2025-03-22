import type { Metadata } from 'next';
import { MuiProvider } from '@/components/mui-provider';
import { StoreProvider } from '@/store';
import { AppHeader } from '@/components/app-header/app-header';
import { Main } from '@/components/main';
import { NavDrawer } from '@/components/nav-drawer';
import { CartDrawer } from '@/components/cart-drawer';
import './globals.css';

export const metadata: Metadata = {
  title: "Gipsy's Vintage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <MuiProvider>
          <StoreProvider>
            <AppHeader />
            <Main>{children}</Main>
            <NavDrawer />
            <CartDrawer />
          </StoreProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
