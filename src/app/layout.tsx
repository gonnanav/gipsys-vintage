import type { Metadata } from 'next';
import { MuiProvider } from '@/ui/components/mui-provider';
import { StoreProvider } from '@/store';
import { AppLayout } from '@/ui/components/app-layout/app-layout';
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
            <AppLayout>{children}</AppLayout>
          </StoreProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
