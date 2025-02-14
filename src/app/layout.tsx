import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { MuiProviders } from './mui-providers';

export const metadata: Metadata = {
  title: "Gipsy's Vintage",
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={roboto.variable}>
        <MuiProviders>{children}</MuiProviders>
      </body>
    </html>
  );
}
