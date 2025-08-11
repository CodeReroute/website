'use client';

import React, { useEffect, Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';
import Footer from '../newsletter/beta-testers/Footer';
import Image from 'next/image';
import { assetUrl } from '../components/utils';

const DeepLinkClaimRestaurant: React.FC = () => {
  const searchParams = useSearchParams();
  const claimId =
    searchParams.get('claim-id') || searchParams.get('claimId') || '';
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web'>('web');

  const deepLink = useMemo(
    () => `mappetizer://signup?claimId=${encodeURIComponent(claimId)}`,
    [claimId],
  );
  const iosStoreUrl = 'https://apps.apple.com/app/id0000000000';
  const androidStoreUrl =
    'https://play.google.com/store/apps/details?id=com.mappetizer.app';

  useEffect(() => {
    const ua =
      typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const currentPlatform: 'ios' | 'android' | 'web' = isIOS
      ? 'ios'
      : isAndroid
      ? 'android'
      : 'web';
    setPlatform(currentPlatform);

    if (currentPlatform !== 'web') {
      const fallbackUrl =
        currentPlatform === 'ios' ? iosStoreUrl : androidStoreUrl;
      const timer = setTimeout(() => {
        window.location.href = fallbackUrl;
      }, 1500);
      window.location.href = deepLink;
      return () => clearTimeout(timer);
    }
  }, [deepLink]);

  return (
    <>
      <div className={styles.header}>
        <Image
          className={styles.logo}
          src={assetUrl('/images/logo.png')}
          alt="Mappetizer"
          title="Mappetizer"
          placeholder="blur"
          blurDataURL={assetUrl('/images/logo_optimized.png')}
          width={150}
          height={40}
        />
      </div>
      <div className={styles['main-container']}>
        <div className={styles['form-container']}>
          {platform === 'web' ? (
            <>
              <h1 className={styles['main-heading']}>
                Please open this link on a mobile device
              </h1>
              <p className={styles['sub-heading']}>
                Please download the app and open this link to View your
                Reservation.
              </p>
            </>
          ) : (
            <>
              <h1 className={styles['main-heading']}>Opening the app…</h1>
              <p className={styles['sub-heading']}>
                If nothing happens, download the app and try again.
              </p>
              {platform === 'ios' ? (
                <a
                  className={styles['submit-button']}
                  href={iosStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download on the App Store
                </a>
              ) : (
                <a
                  className={styles['submit-button']}
                  href={androidStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it on Google Play
                </a>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const Page: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DeepLinkClaimRestaurant />
  </Suspense>
);

export default Page;
