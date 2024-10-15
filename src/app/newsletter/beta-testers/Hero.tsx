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
            HONESTLY, WE ARE OVERWHELMED WITH THE AMOUNT OF PEOPLE WHO
            VOLUNTEERED TO PROVIDE FEEDBACK
          </p>
          <div className={styles['hero-total']}>
            <h1>121</h1>
            <p>AWESOME FOLKS</p>
          </div>
        </div>
      </div>
      <div className={styles['hero-right']}>
        <img
          alt="Hero Image"
          title="Hero Image"
          width={undefined}
          height={undefined}
          src={assetUrl('/images/beta-testers/hero-image.png')}
        />
      </div>
    </div>
  );
};

export default Hero;
