import type { Metadata } from 'next';
import { wcService } from '@/services';
import { parseNavCategories } from '@/transformers/layout';
import { AppProvider } from '@/components/provider';
import { AppLayout, NavCategory } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: "Gipsy's Vintage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: NavCategory[] = [];

  try {
    const rawCategories = await wcService.get('products/categories');
    categories = parseNavCategories(rawCategories);
  } catch (error) {
    console.error(error);
  }

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
