import Script from 'next/script';
import type { Metadata } from 'next';
import { goga } from './fonts/fonts';
import './globals.css';
import { webConfig } from './components/utils/webConfig';

const siteTitle = 'mappetizer';
const siteDescription = 'a restaurant discovery app.';
const keywords = 'mappetizer, restaurant, food, discover, map';
const featuredImage = 'https://codereroute.com/assets/sharing-meta-image.png';
export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content={siteTitle} />
        <meta itemProp="description" content={siteDescription} />
        <meta name="keywords" content={keywords} />
        <meta itemProp="image" content={featuredImage} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://mappetizer.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:image:alt" content={siteTitle} />
        <meta property="fb:app_id" content="811203999437355" />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mappetizer.com" />
        <meta property="twitter:title" content={siteTitle} />
        <meta property="twitter:image" content={featuredImage} />
        <meta property="twitter:description" content={siteDescription} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={featuredImage} />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon_white.png"
          media="(prefers-color-scheme: dark)"
        />
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
      <body className={`${goga.variable}`}>{children}</body>
    </html>
  );
}
