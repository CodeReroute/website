'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';
import Footer from '../newsletter/beta-testers/Footer';
import Image from 'next/image';
import { assetUrl } from '../components/utils';
import { useApiRequest } from '../components/utils/hooks/useApi';

const UNSUBSCRIBE_ENDPOINT = 'unsubscribe';
const BASE_URL = 'https://mappetizer.ca/monitoring/v1/email';
const Unsubscribe: React.FC = () => {
  const searchParams = useSearchParams();
  const [email] = useState<string | null>(searchParams.get('email') || null);
  const [unsubscribeState, makeUnsubscribeRequest] = useApiRequest();

  useEffect(() => {
    if (email) {
      makeUnsubscribeRequest(
        `${BASE_URL}/${UNSUBSCRIBE_ENDPOINT}/${email}`,
        'GET',
      );
    }
  }, [email, makeUnsubscribeRequest]);

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
        <div>
          {unsubscribeState.type === 'REQUEST_START' && (
            <p className={styles['main-heading']}>Loading...</p>
          )}
          {unsubscribeState.type === 'REQUEST_ERROR' && (
            <p className={styles['main-heading']}>
              Error: {unsubscribeState.error.message}
            </p>
          )}
          {unsubscribeState.type === 'REQUEST_SUCCESS' && (
            <>
              <p className={styles['main-heading']}>
                You have been unsubscribed from Mappetizer emails
              </p>
              <p className={styles['main-email']}>{email}</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Unsubscribe;
