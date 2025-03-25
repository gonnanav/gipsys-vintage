import type { Metadata } from 'next';
import { createApplication } from '@/composition-root';
import { AppLayout, AppProviders } from '@/components/app-layout';
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
        <AppProviders>
          <AppLayout categories={categories}>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
