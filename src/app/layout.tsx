import type { Metadata } from 'next';
import { createApplication } from '@/composition-root';
import { AppLayout, AppProviders } from '@/ui/app-layout';
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

  let categories;
  try {
    categories = await app.getCategories();
  } catch (error) {
    console.error(error);
  }

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
