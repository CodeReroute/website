'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Employee from '@/app/components/employee/Employee';
import { employees } from './components/employee/employees';
import { assetUrl } from './components/utils';
import React, { FormEvent, useCallback, useRef } from 'react';
import { RequestState, useApi } from './components/utils/hooks/useApi';

const style: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgba(95, 93, 63, 0.20), rgba(95, 93, 63, 0.20)), url('${assetUrl(
    '/images/hero.jpg',
  )}')`,
};

const getSubmitText = (state: RequestState<unknown>) => {
  switch (state.type) {
    case 'REQUEST_INIT':
      return <>submit</>;
    case 'REQUEST_START':
      return <>submitting...</>;
    case 'REQUEST_ERROR':
      return <>failed: click to try again!</>;
    case 'REQUEST_SUCCESS':
      return <>submitted!</>;
  }
};

export default function Home() {
  const [requestState, makeRequest] = useApi<unknown>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const value = inputRef.current?.value;
      if (!value) {
        inputRef.current?.focus();
        return;
      }
      makeRequest({ email: value });
    },
    [makeRequest, inputRef],
  );
  return (
    <div>
      <div className={styles.hero} style={style}>
        <div>
          <a target="_blank" href="https://codereroute.com">
            <Image
              className={styles.logo}
              src={assetUrl('/images/logo.png')}
              alt="Code Reroute"
              title="Code Reroute"
              width={138}
              height={19}
              priority
            />
          </a>
          <div>
            <h1>mappetizer</h1>
            <div className={styles['sub-heading']}>
              discover + save restaurants into an interactive map &mdash; a
              niche social media app
            </div>
            <div className={styles['sign-up-text']}>
              sign up as a beta tester
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="email"
                required
                placeholder="email"
                disabled={
                  requestState.type === 'REQUEST_START' ||
                  requestState.type === 'REQUEST_SUCCESS'
                }
                className={`${styles.button} ${styles.email}`}
              />
              <button className={`${styles.button} ${styles.submit}`}>
                {getSubmitText(requestState)}
              </button>
            </form>
          </div>
        </div>
        <div className={styles['social-media']}>
          <a target="_blank" href="https://www.instagram.com/map.petizer">
            <Image
              className={styles['social-media']}
              src={assetUrl('/images/social-media/instagram.png')}
              alt="Instagram"
              title="Instagram"
              width={20}
              height={20}
              priority
            />
          </a>
          <a target="_blank" href="https://www.tiktok.com/@mappetizer">
            <Image
              className={styles['social-media']}
              src={assetUrl('/images/social-media/tiktok.png')}
              alt="TikTok"
              title="TikTok"
              width={20}
              height={20}
              priority
            />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/mappetizer/about"
          >
            <Image
              className={styles['social-media']}
              src={assetUrl('/images/social-media/linkedin.png')}
              alt="LinkedIn"
              title="LinkedIn"
              width={20}
              height={20}
              priority
            />
          </a>
        </div>
      </div>
      <div className={styles['dream-team']}>
        <div className={styles['heading-wrapper']}>
          <h1>the dream team</h1>
          <div className={styles['sub-heading']}>
            Working together behind-the-scenes to build the foundational
            architecture and systems needed for our app development.
          </div>
        </div>
        <div className={styles.team}>
          {employees.map((e) => (
            <Employee
              key={e.name}
              name={e.name}
              title={e.title}
              subTitle={e.subTitle}
              pictureUrl={e.pictureUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
