import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from '../../components/utils';
import { mergeClassNames } from '@/app/components/utils/mergeClassNames';

const Meantime: React.FC = () => {
  return (
    <div className={styles['meantime']}>
      <div className={styles['meantime-text-wrapper']}>
        <h1 className={styles['main-heading']}>In the meantime...</h1>
        <p className={styles['sub-heading']}>
          WE'LL KEEP YOU UP TO DATE WITH EVERYTHING MAPPETIZER
        </p>
        <p className={styles['main-text']}>
          You can expect the occasional email from us so we can let you know
          about the features we’re building.
          <br />
          <br />
          When we’re ready, we’ll send a link for all beta testers.
          <br />
          <br />
          If you’d like to opt out of receiving emails, no problem! There’s a
          link at the end.
        </p>
      </div>
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
          className={mergeClassNames(
            styles['meantime-image-phone'],
            styles['meantime-image-phone-third'],
          )}
          src={assetUrl('/images/beta-testers/meantime-phone-1.png')}
        />
      </div>
    </div>
  );
};

export default Meantime;
