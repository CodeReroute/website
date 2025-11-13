'use client';
import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';
import SocialMedia from './components/SocialMedia';
import ReCaptchaV3 from './components/utils/ReCaptchaV3';

export default function Home() {
  return (
    <div>
      <ReCaptchaV3 />
      <div className={styles.hero}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.videoBackground}
        >
          <source src={assetUrl('/video.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Middle section */}
        <div className={styles.middleSection}>
          <SocialMedia className="custom-class" />
          <Image
            className={styles.logo}
            src={assetUrl('/images/logo.png')}
            alt="Mappetizer"
            title="Mappetizer"
            // placeholder="blur"
            // blurDataURL={assetUrl('/images/logo_optimized.png')}
            width={180}
            height={24}
          />
          <p className={styles.comingSoon}>COMING SOON</p>
        </div>
      </div>
    </div>
  );
}
