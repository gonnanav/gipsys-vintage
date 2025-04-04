import type { Metadata } from 'next';
import { createApplication } from '@/application-factory';
import { AppProvider } from '@/ui/provider';
import { AppLayout } from '@/ui/layout';
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
  const categories = await app.getCategoriesSafe();

  return (
    <html lang="he" dir="rtl">
      <body>
        <AppProvider>
          <AppLayout categories={categories}>{children}</AppLayout>
        </AppProvider>
      </body>
    </html>
  );
}
