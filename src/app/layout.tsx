import type { Metadata } from 'next';
import { MuiProviders } from '@/ui/providers/mui/mui-providers';
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
        <MuiProviders>
          <AppLayout>{children}</AppLayout>
        </MuiProviders>
      </body>
    </html>
  );
}
