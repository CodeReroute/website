import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from '../../components/utils';

const Meantime: React.FC = () => {
  return (
    <div className={styles['meantime']}>
      <h1 className={styles['main-heading']}>In the meantime...</h1>
      <p className={styles['sub-heading']}>
        WE'LL KEEP YOU UP TO DATE WITH EVERYTHING MAPPETIZER
      </p>
      <p className={styles['main-text']}>
        If you'd like to opt out of receiving emails, no problem!
        <br />
        There's a link at the end.
      </p>
      <div className={styles['meantime-image']}>
        <Image
          alt="Phone 1"
          title="Phone 1"
          width={220}
          height={391.1}
          className={styles['meantime-image-phone']}
          src={assetUrl('/images/beta-testers/meantime-phone-1.png')}
        />
        <Image
          alt="Phone 2"
          title="Phone 2"
          width={220}
          height={391.1}
          className={styles['meantime-image-phone']}
          src={assetUrl('/images/beta-testers/meantime-phone-1.png')}
        />
        <Image
          alt="Phone 3"
          title="Phone 3"
          width={220}
          height={391.1}
          className={styles['meantime-image-phone']}
          src={assetUrl('/images/beta-testers/meantime-phone-1.png')}
        />
      </div>
    </div>
  );
};

export default Meantime;
