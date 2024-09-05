'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Employee from '@/app/components/employee/Employee';
import { employees } from './components/employee/employees';
import { assetUrl } from './components/utils';
import React, { FormEvent, useCallback, useRef } from 'react';

const style: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgba(95, 93, 63, 0.17), rgba(95, 93, 63, 0.17)), url('${assetUrl(
    '/images/hero.jpg',
  )}')`,
};

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const value = inputRef.current?.value;
      if (!value) {
        inputRef.current?.focus();
        return;
      }
      console.log(value);
    },
    [inputRef],
  );
  return (
    <div>
      <div className={styles.hero} style={style}>
        <Image
          className={styles.logo}
          src={assetUrl('/images/logo.png')}
          alt="logo"
          title="logo"
          width={200}
          height={27.5}
          priority
        />
        <div>
          <h1>mappetizer</h1>
          <div className={styles['sub-heading']}>
            discover + save restaurants into an interactive map &mdash; a niche
            social media app
          </div>
          <div className={styles['sign-up-text']}>sign up as a beta tester</div>
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="email"
              required
              placeholder="email"
              className={`${styles.button} ${styles.email}`}
            />
            <button className={`${styles.button} ${styles.submit}`}>
              submit
            </button>
          </form>
        </div>
        <div className={styles['social-media']}>
          <a href="https://www.instagram.com/map.petizer">
            <Image
              className={styles['social-media']}
              src={assetUrl('/images/social-media/instagram.png')}
              alt="Instagram"
              title="Instagram"
              width={25}
              height={25}
              priority
            />
          </a>
          <a href="https://www.tiktok.com/@mappetizer">
            <Image
              className={styles['social-media']}
              src={assetUrl('/images/social-media/tiktok.png')}
              alt="TikTok"
              title="TikTok"
              width={25}
              height={25}
              priority
            />
          </a>
          <a href="https://www.linkedin.com/company/mappetizer/about">
            <Image
              className={styles['social-media']}
              src={assetUrl('/images/social-media/linkedin.png')}
              alt="LinkedIn"
              title="LinkedIn"
              width={25}
              height={25}
              priority
            />
          </a>
        </div>
      </div>
      <div className={styles['dream-team']}>
        <div className={styles['heading-wrapper']}>
          <h1>The Dream Team</h1>
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
