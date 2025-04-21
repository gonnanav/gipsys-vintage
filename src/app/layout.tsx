import type { Metadata } from 'next';
import { wcService } from '@/services';
import { Category } from '@/core/category';
import { parseCategories } from '@/transformers/category';
import { AppProvider } from '@/components/provider';
import { AppLayout } from '@/components/layout';
import './globals.css';

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
    categories = parseCategories(rawCategories);
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
