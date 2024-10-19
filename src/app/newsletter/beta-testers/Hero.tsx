import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from '../../components/utils';

const Hero: React.FC = () => {
  return (
    <div className={styles['beta-hero-area']}>
      <div className={styles['hero-left']}>
        <div className={styles['hero-text-area']}>
          <Image
            alt="Logo"
            title="Logo"
            width={180}
            height={30.48}
            src={assetUrl('/images/beta-testers/logo-red.png')}
          />
          <h1 className={styles['main-heading']}>
            This is for the Beta Testers
          </h1>
          <p className={styles['thank-you-text']}>THANK YOU</p>
          <p className={styles['hero-description']}>
            Honestly, we are overwhelmed with the amount of people who
            volunteered to provide feedback.
          </p>
          <div className={styles['hero-total']}>
            {/* <div className={styles['hero-total-circle']}>
              <h1>121</h1>
            </div> */}
            <p>121 AWESOME FOLKS</p>
          </div>
        </div>
      </div>
      <div
        title="Photo of French restaurant"
        className={styles['hero-right']}
      ></div>
    </div>
  );
};

export default Hero;
