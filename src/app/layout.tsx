import type { Metadata } from 'next';
import { wcService } from '@/services';
import './globals.css';
import { AppProvider } from '@/components/provider';
import { AppLayout } from '@/components/layout';
import { parseWooCommerceCategories } from '@/services';
import { Category } from '@/core/category';

export const metadata: Metadata = {
  title: "Gipsy's Vintage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: Category[] = [];

  try {
    const rawCategories = await wcService.get('products/categories');
    categories = parseWooCommerceCategories(rawCategories);
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
