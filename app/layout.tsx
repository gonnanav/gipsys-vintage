import type { Metadata } from 'next';
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
    <html lang="he">
      <body>{children}</body>
    </html>
  );
}
