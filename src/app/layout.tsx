import type { Metadata } from 'next';
import { createApplication } from '@/application-factory';
import './globals.css';
import { AppProvider } from '@/components/provider';
import { AppLayout } from '@/components/layout';

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
