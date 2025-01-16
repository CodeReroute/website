'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import Employee from '@/app/components/employee/Employee';
import { employees } from './components/employee/employees';
import { assetUrl } from './components/utils';
import React, { FormEvent, useCallback, useRef, useState } from 'react';
import { RequestState, useApi } from './components/utils/hooks/useApi';
import ReCaptchaV3, {
  requestRecaptchaV3Token,
} from './components/utils/ReCaptchaV3';
import { trackEvent } from './components/utils/googleAnalytics';
import SocialMedia from './components/SocialMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const style: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgba(95, 93, 63, 0.20), rgba(95, 93, 63, 0.20)), url('${assetUrl(
    '/images/map-pattern.png',
  )}')`,
};

export default function Home() {
  const sectionTop = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={sectionTop} className={styles.hero}>
        <div className={styles.header}>
          <Image
            className={styles.logo}
            src={assetUrl('/images/logo.png')}
            alt="Mappetizer"
            title="Mappetizer"
            width={150}
            height={40}
          />

          <h1 className={styles['right-text']}>COMING SOON</h1>
        </div>
        <div className={styles['header-line']} />

        {/* Middle section */}
        <div className={styles.middleSection}>
          <h1>PAUSE.</h1>
          <h3>
          <span>we are updating our site.</span> <br />
          <span>check back early feb.</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
