import type { Metadata } from 'next';
import { montserrat, rocaTwo } from './fonts/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'mappetizer',
  description: 'a restaurant discovery app— plan your next meal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${rocaTwo.variable}`}>
        {children}
      </body>
    </html>
  );
}
