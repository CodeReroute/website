'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Employee from '@/app/components/employee/Employee';
import { employees } from './components/employee/employees';
import { assetUrl } from './components/utils';
import React, { FormEvent, useCallback, useRef } from 'react';
import { RequestState, useApi } from './components/utils/hooks/useApi';
import ReCaptchaV3, {
  requestRecaptchaV3Token,
} from './components/utils/ReCaptchaV3';
import { trackEvent } from './components/utils/googleAnalytics';
import SocialMedia from './components/SocialMedia';

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
  const sectionTop = useRef<HTMLDivElement>(null);
  const sectionBottom = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const value = inputRef.current?.value;
      if (!value) {
        inputRef.current?.focus();
        return;
      }
      trackEvent({
        action: 'submit',
        category: 'mappetizer',
        label: 'beta-testers',
        value,
      });
      requestRecaptchaV3Token((token: string | undefined) => {
        makeRequest({
          email: value,
          recaptcha: token,
        });
      });
    },
    [makeRequest, inputRef],
  );

  const disabled =
    requestState.type === 'REQUEST_START' ||
    requestState.type === 'REQUEST_SUCCESS';
  return (
    <div>
      <div ref={sectionTop} className={styles.hero} style={style}>
        <div>
          <a target="_blank" href="https://codereroute.com">
            <Image
              className={styles.logo}
              src={assetUrl('/images/logo.png')}
              alt="Code Reroute"
              title="Code Reroute"
              width={138}
              height={19}
            />
          </a>
          <div>
            <h1>mappetizer</h1>
            <div className={styles['sub-heading']}>
              discover + save restaurants into an interactive map &mdash;
              revolutionizing the way you experience restaurants
            </div>
            <div className={styles['sign-up-text']}>
              beta testing link now closed.
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="email"
                required
                placeholder="waitlist signup"
                disabled={disabled}
                className={`${styles.button} ${styles.email}`}
              />
              <button
                disabled={disabled}
                className={`${styles.button} ${styles.submit}`}
              >
                {getSubmitText(requestState)}
              </button>
              <ReCaptchaV3 hideText={true} />
            </form>
          </div>
        </div>
        <SocialMedia />
      </div>
      <div ref={sectionBottom} className={styles['dream-team']}>
        <div className={styles['heading-wrapper']}>
          <h1>the dream team</h1>
          <div className={styles['sub-heading']}>
            Working together behind-the-scenes to build the foundational
            architecture and systems needed for our app development
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
