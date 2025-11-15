'use client';
import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';
import SocialMedia from './components/SocialMedia';

export default function Home() {
  return (
    <div>
      {/* <ReCaptchaV3 /> */}
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
          <div className={styles.leftSideSection}>
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
          </div>
          <div className={styles.rightSideSection}>
            <div className={styles.textContainer}>
              <p>
                We’re a fast-paced startup building new tech for{' '}
                <b>restaurant discovery</b>.
              </p>
              <br />
              <p>
                Made in-house and from scratch, mappetizer is transforming the
                restaurant industry and the way we go out to eat.
              </p>
              <br />
              <p>Coming soon.</p>
              <SocialMedia className="custom-class" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
