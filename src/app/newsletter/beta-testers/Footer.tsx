import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import SocialMedia from '@/app/components/SocialMedia';
import { assetUrl } from '../../components/utils';

const year = new Date().getFullYear();
const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-thank-you']}>
        THANK YOU FOR BEING PART OF THE JOURNEY!
      </div>
      <Image
        alt="Logo"
        title="Logo"
        width={180}
        height={30.48}
        className={styles['footer-logo']}
        src={assetUrl('/images/beta-testers/logo-red.png')}
      />
      <div className={styles['footer-divide']}>
        <div className={styles['footer-left']}>
          <p className={styles['footer-company-name']}>@ {year} Code Reroute</p>
          <p className={styles['footer-declaration']}>
            Code Reroute is comprised of a multidisciplinary team of software
            engineers and designers building <a href="/">@mappetizer</a> &mdash;
            the world's biggest restaurant app.
          </p>
          <a href="#">unsubscribe</a>
        </div>
        <div className={styles['footer-right']}>
          <SocialMedia
            path="/beta-testers"
            className={styles['footer-social-media']}
          />
          <p>
            We respectfully acknowledge that we are located on Treaty 6
            territory, a traditional meeting ground and home for many Indigenous
            Peoples, including Cree, Saulteaux, Niisitapi (Blackfoot), Metis,
            and Nakota Sioux Peoples
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
