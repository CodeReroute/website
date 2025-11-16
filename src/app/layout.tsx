import Script from 'next/script';
import type { Metadata } from 'next';
import { goga } from './fonts/fonts';
import './globals.css';
import { webConfig } from './components/utils/webConfig';

const siteTitle = 'mappetizer';
const siteDescription = 'The ‘going out to eat’ app.';
const keywords = 'mappetizer, restaurant, food, discover, map';
const featuredImage = 'https://mappetizer.com/sharing-meta-image.png';
export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  keywords,
  openGraph: {
    type: 'website',
    url: 'https://mappetizer.com',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        alt: siteTitle,
        url: featuredImage,
      },
    ],
  },
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
        <meta name="name" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="image" content={featuredImage} />
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
        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon.png"
          media="(prefers-color-scheme: light)"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-white.png"
          media="(prefers-color-scheme: dark)"
          sizes="32x32"
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
