'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.scss';
import Footer from '../newsletter/beta-testers/Footer';
import Image from 'next/image';
import { assetUrl } from '../components/utils';
import { useApiRequest } from '../components/utils/hooks/useApi';

const UNSUBSCRIBE_ENDPOINT = '/endpoint';

const Unsubscribe: React.FC = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unsubscribeState, makeUnsubscribeRequest] = useApiRequest();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      setEmail(null);
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (email) {
      makeUnsubscribeRequest(UNSUBSCRIBE_ENDPOINT, 'POST', { email });
    }
  }, [email, makeUnsubscribeRequest]);

  useEffect(() => {
    if (unsubscribeState.type === 'REQUEST_ERROR') {
      setError('Invalid response from the server');
      setLoading(false);
    } else if (unsubscribeState.type === 'REQUEST_SUCCESS') {
      setLoading(false);
    }
  }, [unsubscribeState]);

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
          {loading && <p className={styles['main-heading']}>Loading...</p>}
          {error && <p className={styles['main-heading']}>Error: {error}</p>}
          {!loading &&
            !error &&
            unsubscribeState.type === 'REQUEST_SUCCESS' && (
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
