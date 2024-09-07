import Script from 'next/script';
import type { Metadata } from 'next';
import { montserrat, rocaTwo } from './fonts/fonts';
import './globals.css';
import { webConfig } from './components/utils/webConfig';

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
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${webConfig.gaTrackingId}`}
        ></script>
        <Script
          async
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${webConfig.gaTrackingId}');
            `,
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${rocaTwo.variable}`}>
        {children}
      </body>
    </html>
  );
}
